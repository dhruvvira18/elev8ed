import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Branding Side (Hidden on Mobile) */}
      <div className="relative hidden flex-col justify-between bg-zinc-950 p-10 text-white lg:flex border-r border-zinc-800">
        <div className="flex items-center text-lg font-bold tracking-tight">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mr-2">✦</span>
          Elev8ed
        </div>
        
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-zinc-300">
              &quot;The ultimate operations engine for cross-department workspaces, recruitment streams, and automated logistics.&quot;
            </p>
          </blockquote>
        </div>
        
        <div className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Elev8ed Inc. All rights reserved.
        </div>
      </div>

      {/* Right Form Interactive Side */}
      <div className="flex flex-col items-center justify-center p-8 bg-background">
        <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}