"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// TypeScript Interfaces for our Database Shapes
interface Workspace {
  id: string
  name: string
  slug: string
  owner_id: string
}

interface MemberRecord {
  id: string
  role: string
  status: string
  workspaces: Workspace
}

export default function WorkspaceGatewayPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [memberships, setMemberships] = useState<MemberRecord[]>([])
  const [view, setView] = useState<'launcher' | 'create'>('launcher')

  // Form State for Workspace Creation
  const [orgName, setOrgName] = useState('')
  const [slug, setSlug] = useState('')
  const [tenureYear, setTenureYear] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // 1. Fetch User Memberships on Mount
  useEffect(() => {
    async function loadWorkspaces() {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = '/login'
        return
      }

      // Generate dynamic default tenure cycle based on current year (e.g., "2026-2027")
      const currentYear = new Date().getFullYear()
      setTenureYear(`${currentYear}-${currentYear + 1}`)

      // Query the junction table to get all active workspaces this user belongs to
      const { data, error } = await supabase
        .from('members')
        .select('id, role, status, workspaces(id, name, slug, owner_id)')
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (!error && data) {
        // Filter out any potential null join errors and set state
        const validMemberships = (data || []).filter((m: Record<string, unknown>) => Boolean(m.workspaces)) as unknown as MemberRecord[]
        setMemberships(validMemberships)

        // If they have 0 workspaces, force the UI directly to the 'create' screen
        if (validMemberships.length === 0) {
          setView('create')
        }
      }
      setIsLoading(false)
    }

    loadWorkspaces()
  }, [])

  // 2. Auto-Slug Generator Helper
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setOrgName(val)
    // Convert "ACM Student Chapter" -> "acm-student-chapter"
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    setSlug(generatedSlug)
  }

  // 3. Handle Workspace Creation Sequence
  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Step A: Insert into workspaces table
    const { data: wsData, error: wsError } = await supabase
      .from('workspaces')
      .insert([
        {
          name: orgName,
          slug: slug,
          owner_id: user.id,
        },
      ])
      .select()
      .single()

    if (wsError || !wsData) {
      setErrorMessage(wsError?.message || 'Failed to create workspace. That slug may already be taken.')
      setIsSubmitting(false)
      return
    }

    // Step B: Create initial active tenure for this workspace
    await supabase.from('tenures').insert([
      {
        workspace_id: wsData.id,
        year_range: tenureYear,
        is_current: true,
      },
    ])

    // Step C: Map the founder into the members table as 'super_core'
    const { error: memberError } = await supabase.from('members').insert([
      {
        user_id: user.id,
        workspace_id: wsData.id,
        role: 'super_core',
        status: 'active',
      },
    ])

    if (memberError) {
      setErrorMessage('Workspace created, but failed to assign admin permissions. Please contact support.')
      setIsSubmitting(false)
      return
    }

    // Launch directly into their new organization dashboard
    window.location.href = `/dashboard?ws=${wsData.slug}`
  }

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Syncing your workspaces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Top Header & Navigation Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {view === 'launcher' ? 'Select Workspace' : 'Create Organization'}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {view === 'launcher' 
                ? 'Choose an organization to launch into your operational dashboard' 
                : 'Set up a new workspace environment for your team or chapter'}
            </p>
          </div>

          {memberships.length > 0 && (
            <button
              onClick={() => setView(view === 'launcher' ? 'create' : 'launcher')}
              className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
            >
              {view === 'launcher' ? '+ New Workspace' : '← Back to Workspaces'}
            </button>
          )}
        </div>

        {/* VIEW A: The Launcher Grid */}
        {view === 'launcher' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memberships.map((record) => (
              <div
                key={record.id}
                onClick={() => window.location.href = `/dashboard?ws=${record.workspaces.slug}`}
                className="group relative flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 shadow-sm transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-md cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
                      {record.role.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {record.workspaces.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    elev8ed.app/dashboard?ws={record.workspaces.slug}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  Launch Dashboard →
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW B: The Creation Form */}
        {view === 'create' && (
          <div className="mx-auto max-w-xl rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 shadow-sm">
            {errorMessage && (
              <div className="mb-6 p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateWorkspace} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Organization / Club Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. ACM Student Chapter"
                  value={orgName}
                  onChange={handleNameChange}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Workspace URL Slug
                </label>
                <div className="flex rounded-md border border-zinc-800 bg-zinc-950 shadow-sm">
                  <span className="flex items-center pl-3 text-xs text-zinc-500 select-none">
                    elev8ed.app/dashboard?ws=
                  </span>
                  <input
                    type="text"
                    placeholder="acm-student-chapter"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full bg-transparent px-2 py-2 text-sm text-white focus-visible:outline-none disabled:opacity-50 font-mono"
                  />
                </div>
                <p className="text-xs text-zinc-500">This identifier is unique to your organization across the platform.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Initial Operational Tenure Year
                </label>
                <input
                  type="text"
                  placeholder="2026-2027"
                  value={tenureYear}
                  onChange={(e) => setTenureYear(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 font-mono"
                />
                <p className="text-xs text-zinc-500">All tasks, candidates, and finances will be anchored to this cycle.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !orgName || !slug}
                className="w-full flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? 'Provisioning Environment...' : 'Initialize Workspace'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}