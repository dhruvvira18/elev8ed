"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

interface WorkspaceDetails {
  name: string
  slug: string
}

export default function DashboardOverviewPage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('ws')
  const [workspace, setWorkspace] = useState<WorkspaceDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWorkspaceDetails() {
      if (!slug) return
      const { data } = await supabase
        .from('workspaces')
        .select('name, slug')
        .eq('slug', slug)
        .single()

      if (data) setWorkspace(data)
      setLoading(false)
    }
    loadWorkspaceDetails()
  }, [slug])

  if (loading) {
    return <div className="p-8 text-sm text-zinc-500">Loading command center...</div>
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Active Cycle: 2026-2027
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            {workspace?.name || 'Workspace Dashboard'}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome to your organization&apos;s live operational command center.
          </p>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { label: 'Active Tasks', val: '0', sub: 'Across all departments' },
          { label: 'Recruitment Pool', val: '0', sub: 'Candidates in pipeline' },
          { label: 'Sponsorship Vault', val: '$0.00', sub: 'Secured for this cycle' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{stat.label}</span>
            <div className="text-3xl font-black text-white mt-2">{stat.val}</div>
            <span className="text-xs text-zinc-500 mt-1 block">{stat.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}