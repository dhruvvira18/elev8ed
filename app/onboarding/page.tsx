import Link from "next/link"

export default function OnboardingSelectorPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex overflow-hidden selection:bg-white/20">
      
      {/* 1. STRUCTURAL ONBOARDING SIDEBAR */}
      <aside className="w-16 md:w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between items-center md:items-stretch py-6 px-4 shrink-0 transition-all duration-300">
        <div className="space-y-8 w-full">
          {/* Logo Identity Slot */}
          <div className="flex items-center gap-3 px-2 justify-center md:justify-start">
            <div className="h-2.5 w-2.5 rounded-full bg-white shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="hidden md:inline text-sm font-black tracking-tight">Elev8Ed</span>
          </div>

          {/* Contextual Onboarding Tabs */}
          <nav className="space-y-2 w-full">
            <div className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white transition-all text-xs font-semibold justify-center md:justify-start">
              <span className="text-xs">🔑</span>
              <span className="hidden md:inline tracking-tight">Workspace Gateway</span>
            </div>
            <div className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 cursor-not-allowed transition-all text-xs font-medium justify-center md:justify-start">
              <span className="text-xs">⚙️</span>
              <span className="hidden md:inline tracking-tight">Setup Wizard (Locked)</span>
            </div>
            <div className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-600 cursor-not-allowed transition-all text-xs font-medium justify-center md:justify-start">
              <span className="text-xs">📡</span>
              <span className="hidden md:inline tracking-tight">Roster Ingestion</span>
            </div>
          </nav>
        </div>

        {/* Account Session Context Footer */}
        <div className="w-full border-t border-neutral-900 pt-4 flex items-center gap-3 px-2 justify-center md:justify-start">
          <div className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center font-mono text-[10px] font-bold border border-neutral-700 text-neutral-200">
            U
          </div>
          <div className="hidden md:block overflow-hidden">
            <p className="text-xs font-bold tracking-tight truncate">Authenticated User</p>
            <p className="text-[9px] font-mono text-neutral-500 truncate">Pending Verification</p>
          </div>
        </div>
      </aside>

      {/* 2. MAIN ONBOARDING SELECTION GATE VIEW */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full flex flex-col justify-center animate-fade-in-up">
        
        {/* Header Introduction Block */}
        <div className="space-y-2 max-w-xl pb-2">
          <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Initialization Phase // 01</span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            Establish your operational hub.
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Deploy an entirely clean workspace architecture for your student organization, or parse a live invitation token to join an active pre-allocated committee portfolio.
          </p>
        </div>

        {/* Action Gate Cards Grid - Structured Like Dashboard Modules */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Card Option A: Provision Clean Architecture */}
          <div className="group rounded-2xl border border-neutral-850 bg-neutral-950 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-2xl">
            
            {/* Geometric multi-color interactive vector structure block */}
            <div className="rounded-xl border border-neutral-800 bg-black p-4 h-36 flex flex-col justify-between relative overflow-hidden transition-colors group-hover:border-neutral-700">
              <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
                <span>SYS_PROVISION // ROOT_NODE</span>
                <span className="text-cyan-400">STATUS: READY</span>
              </div>
              
              <div className="flex items-center justify-center h-full">
                <svg className="h-full w-full max-w-[140px]" viewBox="0 0 160 80" fill="none">
                  <circle cx="40" cy="40" r="12" stroke="#06b6d4" strokeWidth="2" fill="black" />
                  <circle cx="120" cy="40" r="12" stroke="#10b981" strokeWidth="2" fill="black" />
                  <path d="M52 40 L108 40" stroke="url(#onboard-grad-1)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M40 28 C 40 12, 120 12, 120 28" stroke="#d946ef" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <defs>
                    <linearGradient id="onboard-grad-1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="absolute bottom-2 right-3 text-[8px] font-mono text-neutral-600">DEPL_MATRIX</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <h4 className="text-xs font-bold text-white tracking-tight">Deploy New Workspace</h4>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Register a clean container instance for a new student chapter. Initialize administrative roles, security thresholds, and construct custom operational pipelines.
              </p>
            </div>

            <Link
              href="/onboarding/create"
              className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-white px-4 text-xs font-semibold text-black transition-all hover:bg-neutral-200"
            >
              Create New Workspace
            </Link>
          </div>

          {/* Card Option B: Sync Roster via Verification Token */}
          <div className="group rounded-2xl border border-neutral-850 bg-neutral-950 p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-neutral-600 hover:shadow-2xl">
            
            {/* Structured geometric token verification stream visual block */}
            <div className="rounded-xl border border-neutral-800 bg-black p-4 h-36 flex flex-col justify-between relative overflow-hidden transition-colors group-hover:border-neutral-700">
              <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500">
                <span>INGEST_STREAM // ACCESS_KEY</span>
                <span className="text-magenta-400" style={{ color: '#d946ef' }}>STATUS: LISTENING</span>
              </div>
              
              <div className="flex items-center justify-center h-full">
                <svg className="h-full w-full max-w-[140px]" viewBox="0 0 160 80" fill="none">
                  {/* Concentric high tech target lines using abstract magenta structure */}
                  <circle cx="80" cy="40" r="22" stroke="#d946ef" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                  <circle cx="80" cy="40" r="14" stroke="#d946ef" strokeWidth="2" fill="black" />
                  <path d="M20 40 L58 40" stroke="#404040" strokeWidth="1.5" />
                  <path d="M102 40 L140 40" stroke="#404040" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="absolute bottom-2 right-3 text-[8px] font-mono text-neutral-600">TOKEN_RESOLVER</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#d946ef' }} />
                <h4 className="text-xs font-bold text-white tracking-tight">Enter Invitation Token</h4>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Input a multi-character validation code generated by your organization's core head to sync instantly with pre-assigned departments, tasks, and file storage environments.
              </p>
            </div>

            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="e8_inv_token_..." 
                className="h-9 w-full rounded-lg border border-neutral-850 bg-black px-3 text-xs text-white placeholder-neutral-600 outline-none focus:border-neutral-700 transition-colors pr-20"
              />
              <button className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-neutral-900 text-[10px] font-bold text-neutral-300 border border-neutral-800 hover:text-white transition-all">
                Validate
              </button>
            </div>
          </div>

        </div>

        {/* Architecture Footer Spacers */}
        <footer className="pt-6 border-t border-neutral-900 text-[10px] text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>Engineered with precision by Nevedhya & Dhruv</p>
          <p>Elev8Ed Gateway Infrastructure Environment</p>
        </footer>
      </main>
    </div>
  )
}