"use client"

import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

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

  // Upgraded Two-Tier Form State
  const [parentOrg, setParentOrg] = useState('')
  const [clubName, setClubName] = useState('')
  const [slug, setSlug] = useState('')
  const [tenureYear, setTenureYear] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 1. Fetch User Memberships on Mount
  useEffect(() => {
    async function loadWorkspaces() {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = '/login'
        return
      }

      // Automatically default to the current academic cycle (e.g., "2026-2027")
      const currentYear = new Date().getFullYear()
      setTenureYear(`${currentYear}-${currentYear + 1}`)

      const { data, error } = await supabase
        .from('members')
        .select('id, role, status, workspaces(id, name, slug, owner_id)')
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (!error && data) {
        const validMemberships = (data || []).filter((m: Record<string, unknown>) => Boolean(m.workspaces)) as unknown as MemberRecord[]
        setMemberships(validMemberships)

        if (validMemberships.length === 0) {
          setView('create')
        }
      } else {
        console.warn("Notice: Could not fetch memberships. Defaulting to creation form.", error?.message)
        setView('create')
      }
      
      setIsLoading(false)
    }

    loadWorkspaces()
  }, [])

  // 2. Real-Time Slug Generator Helper
  const updateSlugPreview = (org: string, club: string) => {
    const combined = `${org}-${club}`
    const generatedSlug = combined
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '') // Remove leading or trailing hyphens
    setSlug(generatedSlug)
  }

  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setParentOrg(val)
    updateSlugPreview(val, clubName)
  }

  const handleClubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setClubName(val)
    updateSlugPreview(parentOrg, val)
  }

  // 3. Handle Clipboard Copying
  const handleCopyLink = () => {
    const fullUrl = `https://elev8ed.app/dashboard?ws=${slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 4. Handle Workspace Creation Sequence
  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Combine into a clean display name: e.g., "IIT Bombay — Chemistry Club"
    const fullName = `${parentOrg.trim()} — ${clubName.trim()}`

    // Step A: Insert into workspaces table
    const { data: wsData, error: wsError } = await supabase
      .from('workspaces')
      .insert([
        {
          name: fullName,
          slug: slug,
          owner_id: user.id,
        },
      ])
      .select()
      .single()

    if (wsError || !wsData) {
      setErrorMessage(wsError?.message || 'Failed to create workspace. That club link may already be taken.')
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

    // Step C: Map founder into members table as 'super_core'
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

    window.location.href = `/dashboard?ws=${wsData.slug}`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-zinc-400">Loading workspaces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Top Header & Navigation Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              {view === 'launcher' ? 'Select Workspace' : 'Create Organization'}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {view === 'launcher' 
                ? 'Choose a club or committee to enter your dashboard.' 
                : 'Set up a permanent workspace for your campus organization.'}
            </p>
          </div>

          {memberships.length > 0 && (
            <button
              onClick={() => setView(view === 'launcher' ? 'create' : 'launcher')}
              className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-none transition-colors"
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
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {record.workspaces.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    elev8ed.app/dashboard?ws={record.workspaces.slug}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  Launch →
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW B: The Creation Form */}
        {view === 'create' && (
          <div className="mx-auto max-w-xl rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 shadow-sm">
            {errorMessage && (
              <div className="mb-6 p-3 text-sm font-medium text-red-400 bg-red-950/50 border border-red-800/50 rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateWorkspace} className="space-y-6">
              
              {/* College / Institution Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  College / Institution Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. IIT Bombay"
                  value={parentOrg}
                  onChange={handleOrgChange}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600 disabled:opacity-50"
                />
              </div>

              {/* Club / Committee Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Club / Team Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chemistry Club"
                  value={clubName}
                  onChange={handleClubChange}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600 disabled:opacity-50"
                />
              </div>

              {/* Read-Only Slug Preview Badge with Interactive Copy Button */}
              {slug && (
                <div className="flex items-center justify-between rounded-md border border-zinc-800/80 bg-zinc-950/60 p-3">
                  <div className="space-y-1 overflow-hidden pr-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      Generated Platform Link
                    </span>
                    <div className="text-xs font-mono text-zinc-300 truncate">
                      elev8ed.app/dashboard?ws=<span className="text-white font-bold">{slug}</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="shrink-0 rounded bg-zinc-800/80 border border-zinc-700 px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white focus:outline-none transition-all active:scale-95"
                  >
                    {copied ? 'Copied! ✓' : 'Copy Link'}
                  </button>
                </div>
              )}

              {/* Tenure Year */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Tenure Year
                </label>
                <input
                  type="text"
                  placeholder="2026-2027"
                  value={tenureYear}
                  onChange={(e) => setTenureYear(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-zinc-600 disabled:opacity-50 font-mono"
                />
                <p className="text-xs text-zinc-500">Tasks, members, and finances will be grouped under this academic year.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !parentOrg || !clubName}
                className="w-full flex items-center justify-center rounded-md bg-white text-zinc-950 px-4 py-2.5 text-sm font-semibold shadow transition-colors hover:bg-zinc-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Workspace...' : 'Initialize Workspace'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}