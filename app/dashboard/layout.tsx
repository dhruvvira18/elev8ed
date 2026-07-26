"use client"

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SidebarContent() {
  const searchParams = useSearchParams()
  const currentSlug = searchParams.get('ws') || ''

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* App Branding & Workspace Badge */}
        <div className="flex items-center space-x-3 px-2">
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-zinc-950 font-black text-xl">
            E
          </div>
          <div>
            <span className="font-bold tracking-tight block text-sm">Elev8ed</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-mono block truncate max-w-[140px]">
              {currentSlug || 'Workspace'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {['Overview', 'Tasks & Kanban', 'Recruitment Pipeline', 'CertiSwift Vault', 'Finances'].map((item, idx) => (
            <a
              key={item}
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                idx === 0 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-zinc-800/80 pt-4 px-2 flex items-center justify-between">
        <a
          href="/workspace"
          className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          ← Switch Club
        </a>
        <a
          href="/auth/signout"
          className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
        >
          Sign Out
        </a>
      </div>
    </aside>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Suspense boundary satisfies Next.js static prerender compiler */}
      <Suspense fallback={<aside className="w-64 border-r border-zinc-800 bg-zinc-900/40 p-4 animate-pulse" />}>
        <SidebarContent />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}