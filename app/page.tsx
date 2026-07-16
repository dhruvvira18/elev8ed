import Link from "next/link"

const features = [
  {
    title: "Centralized Workspace",
    description: "Bring communications, onboarding, and coordination into one focused environment.",
    icon: (
      <svg className="h-5 w-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Smart Onboarding",
    description: "Invite new members with structured access, automatic role mapping, and department assignments.",
    icon: (
      <svg className="h-5 w-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    title: "Multi-Committee Sync",
    description: "Manage multiple college portfolios seamlessly without losing role context or admin permissions.",
    icon: (
      <svg className="h-5 w-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Structured Hierarchy",
    description: "Define departments, map internal responsibilities, and keep teams running smoothly.",
    icon: (
      <svg className="h-5 w-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
]

const upcoming = [
  "Task management & tracking",
  "Attendance & participation tools",
  "Automated certificate engine",
  "Seamless annual handover vaults",
  "Interactive event workflows",
  "AI admin automations",
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Monochromatic structural grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-md animate-fade-in-up">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <div>
              <p className="text-sm font-bold tracking-tight">Elev8Ed</p>
              <p className="hidden text-[10px] text-neutral-400 sm:block">
                Simplifying College Committee Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg px-3.5 py-1.5 text-xs font-semibold text-neutral-400 transition-all hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm transition-all hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6 animate-fade-in-up [animation-delay:150ms]">
            <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/40 px-3.5 py-1 text-xs font-medium text-neutral-300">
              ⚡ Built exclusively for college committees
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                One operating system for college committees.
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
                Stop juggling chaotic chats, links, and documents. Elev8Ed centralizes your department structure, member directories, and operational workflows into a single, clean workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-xs font-semibold text-black shadow transition-all hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get started
              </Link>

              <Link
                href="/learnmore"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-800 bg-black px-5 text-xs font-semibold text-neutral-200 shadow-sm transition-all hover:bg-neutral-900 hover:text-white"
              >
                Learn more
              </Link>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-3.5 transition-all hover:bg-neutral-900/50 hover:border-neutral-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">SECURE ACCESS</span>
                <p className="mt-1 text-xs font-medium text-neutral-400">Role-aware student onboarding</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-3.5 transition-all hover:bg-neutral-900/50 hover:border-neutral-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">STABLE STRUCTURE</span>
                <p className="mt-1 text-xs font-medium text-neutral-400">Clear department roles & hierarchy</p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/20 p-3.5 transition-all hover:bg-neutral-900/50 hover:border-neutral-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">COORDINATION</span>
                <p className="mt-1 text-xs font-medium text-neutral-400">All tasks & members in one place</p>
              </div>
            </div>
          </div>

          {/* Premium UI Mockup Card with Dynamic Analytics Line Graph */}
          <div className="relative group animate-fade-in-up [animation-delay:300ms]">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-2xl transition-all duration-300 group-hover:border-neutral-600 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold tracking-tight text-white">Elev8Ed Workspace</p>
                  <p className="text-[10px] text-neutral-400">Active Committee Profile</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-neutral-200 border border-neutral-800">
                  v1.0 MVP
                </span>
              </div>

              {/* Dynamic Double-Graph Dashboard Widget with Magenta Accent */}
              <div className="mb-4 rounded-xl border border-neutral-800 bg-black p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#d946ef' }} />
                    <span className="text-neutral-400 font-medium">Event Engagement Index</span>
                  </div>
                  <span className="text-white font-mono font-bold">88.4%</span>
                </div>
                
                <div className="h-20 w-full pt-1">
                  <svg className="h-full w-full" viewBox="0 0 300 80" fill="none">
                    <path d="M0 70 Q 40 60, 80 35 T 160 40 T 240 15 T 300 5 L 300 80 L 0 80 Z" fill="url(#magenta-gradient)" opacity="0.12" />
                    <path d="M0 70 Q 40 60, 80 35 T 160 40 T 240 15 T 300 5" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 75 Q 50 55, 100 60 T 200 30 T 300 25" stroke="#404040" strokeWidth="1" strokeDasharray="3 3" />
                    <defs>
                      <linearGradient id="magenta-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="black" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 transition-all hover:border-neutral-700 hover:bg-neutral-900/60">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">CORE DIRECTORY</span>
                  <p className="mt-1 text-xs text-neutral-200">Set up distinct departments and maintain complete operational oversight.</p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 transition-all hover:border-neutral-700 hover:bg-neutral-900/60">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">ROLES & ROSTERS</span>
                  <p className="mt-1 text-xs text-neutral-200">Assign structural hierarchies and view member portfolios instantly.</p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-3.5 transition-all hover:border-neutral-700 hover:bg-neutral-900/60">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">INVITATION FLOWS</span>
                  <p className="mt-1 text-xs text-neutral-200">Onboard new students effortlessly with structured invitation tokens.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 animate-fade-in-up [animation-delay:450ms]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition-all duration-300 hover:border-neutral-600 hover:-translate-y-1 hover:shadow-xl backdrop-blur"
            >
              <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 transition-colors group-hover:bg-neutral-850">
                {feature.icon}
              </div>
              <h2 className="text-xs font-semibold text-white group-hover:underline decoration-neutral-500 underline-offset-4">{feature.title}</h2>
              <p className="mt-1.5 text-xs leading-normal text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Pipeline Section */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 animate-fade-in-up [animation-delay:600ms]">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 backdrop-blur-sm lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl text-white">
                A cleaner, smarter blueprint for campus operations.
              </h3>
              <p className="max-w-lg text-xs leading-relaxed text-neutral-400">
                Replacing fragmented groups and manual administration with custom tools developed specifically for student organizations.
              </p>

              <div className="flex flex-col gap-2.5 sm:flex-row pt-2">
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-xs font-semibold text-black shadow transition-all hover:bg-neutral-200 hover:scale-[1.02]"
                >
                  Start Now
                </Link>

                <Link
                  href="/learnmore"
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-800 bg-black px-4 text-xs font-semibold text-neutral-200 shadow-sm transition-all hover:bg-neutral-900 hover:text-white"
                >
                  Learn more
                </Link>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {upcoming.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg border border-neutral-800 bg-black p-3 text-xs text-neutral-300 transition-all hover:border-neutral-600"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upgraded Premium Monochromatic Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 animate-fade-in-up [animation-delay:750ms]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">CREATIVE DIRECTORS</p>
              <p className="text-sm font-medium text-neutral-200 mt-1">
                Engineered with precision by <span className="text-white underline underline-offset-2">Nevedhya</span> & <span className="text-white underline underline-offset-2">Dhruv</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>

          <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-neutral-500">
            <p>© {new Date().getFullYear()} Elev8Ed. Committees, completely elev8ed.</p>
            <p>One unified environment for student organization architecture.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}