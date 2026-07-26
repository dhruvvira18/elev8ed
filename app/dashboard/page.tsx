"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '../../lib/supabase'

interface WorkspaceDetails {
  name: string
  slug: string
}

function FigmaDashboardContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('ws')
  const [workspace, setWorkspace] = useState<WorkspaceDetails | null>(null)

  useEffect(() => {
    async function loadWorkspaceDetails() {
      if (!slug) return
      const { data } = await supabase
        .from('workspaces')
        .select('name, slug')
        .eq('slug', slug)
        .single()
      if (data) setWorkspace(data)
    }
    loadWorkspaceDetails()
  }, [slug])

  // Your exact Figma department color matrix!
  const departmentCards = [
    { name: 'Creative & Design', tasks: '8 Active', color: 'border-pink-500/40 bg-pink-500/5 text-pink-400', badge: 'bg-pink-500/20' },
    { name: 'Technical & Web', tasks: '12 Active', color: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400', badge: 'bg-cyan-500/20' },
    { name: 'PR & Sponsorships', tasks: '5 Active', color: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400', badge: 'bg-emerald-500/20' },
    { name: 'Logistics & Ops', tasks: '14 Active', color: 'border-purple-500/40 bg-purple-500/5 text-purple-400', badge: 'bg-purple-500/20' },
    { name: 'Finance & Treasury', tasks: '3 Active', color: 'border-amber-500/40 bg-amber-500/5 text-amber-400', badge: 'bg-amber-500/20' },
    { name: 'HR & Management', tasks: '6 Active', color: 'border-lime-500/40 bg-lime-500/5 text-lime-400', badge: 'bg-lime-500/20' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              2026-2027 Cycle
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mt-2">
            {workspace?.name || 'Loading Workspace...'}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            + Invite Member
          </button>
          <button className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors shadow">
            New Task
          </button>
        </div>
      </div>

      {/* TOP ROW: Figma Mockup 2-Column Grid (Action List + Wave Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Card: Priority Action Feed (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Priority Action Feed</h2>
            <span className="text-[11px] font-mono text-zinc-500">Live Sync</span>
          </div>
          
          <div className="space-y-3.5">
            {[
              { title: 'Finalize auditorium bookings for annual fest', dept: 'Logistics', status: 'Urgent' },
              { title: 'Review sponsorship deck with Vice President', dept: 'PR & Sponsor', status: 'Review' },
              { title: 'Deploy CertiSwift template for workshop attendees', dept: 'Technical', status: 'In Progress' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
                <div className="flex items-center space-x-3 pr-4">
                  <div className="h-2 w-2 rounded-full bg-zinc-400 shrink-0" />
                  <span className="text-sm font-medium text-zinc-200 truncate">{item.title}</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400 shrink-0">
                  {item.dept}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a href="#kanban" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
              View All Tasks →
            </a>
          </div>
        </div>

        {/* Right Card: Activity Pulse Wave Chart (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Operational Pulse</h2>
            <span className="text-xs font-mono text-zinc-400">+24% velocity</span>
          </div>

          {/* Pure CSS/SVG Simulated Glowing Wave Chart from Figma */}
          <div className="my-8 relative h-36 w-full flex items-end justify-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Under-fill glowing gradient */}
              <path d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 10 L 300 100 L 0 100 Z" fill="url(#waveGrad)" />
              {/* Sharp vector line */}
              <path d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 10" fill="none" stroke="#71717a" strokeWidth="2.5" />
              <path d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 10" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            </svg>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 z-10 text-xs text-zinc-500 font-mono">
            <span>WEEK 1</span>
            <span>WEEK 2</span>
            <span>WEEK 3</span>
            <span className="text-zinc-300 font-bold">CURRENT</span>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: Department Matrices Grid (Only colored elements on the page!) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 font-mono">
            Department Matrices
          </h2>
          <span className="text-xs text-zinc-500">6 Active Teams</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departmentCards.map((dept) => (
            <div
              key={dept.name}
              className={`group relative rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] cursor-pointer bg-zinc-900/60 ${dept.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`h-2.5 w-2.5 rounded-full ${dept.badge} border border-current`} />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-80">
                  {dept.tasks}
                </span>
              </div>

              <h3 className="text-lg font-black text-white group-hover:underline decoration-current decoration-2 underline-offset-4">
                {dept.name}
              </h3>
              
              <p className="text-xs text-zinc-400 mt-1">
                Manage kanban boards, recruitment rounds, and budget allocation.
              </p>

              <div className="mt-6 flex items-center justify-end text-xs font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                Enter Matrix →
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function DashboardOverviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-zinc-500 font-mono">Loading Figma layout...</div>}>
      <FigmaDashboardContent />
    </Suspense>
  )
}