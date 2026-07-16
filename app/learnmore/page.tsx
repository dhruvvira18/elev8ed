import Link from "next/link"

const deepDives = [
  {
    module: "Task Architecture",
    headline: "Accountability without the constant pings.",
    details: "Ditch the messy WhatsApp group tracking. Assign specific tasks straight to individual members, set rigid deadlines, and observe completion metrics across departments in real time.",
    pill: "Core System"
  },
  {
    module: "Automated Verification",
    headline: "Bulk distribution handled instantly.",
    details: "No more manually editing certificate design files for hours after a flagship fest ends. Automate verified PDF certificate creation, generation, and direct student email distribution instantly.",
    pill: "Automation Engine"
  },
  {
    module: "The Handover Vault",
    headline: "Retain institutional memory permanently.",
    details: "Prevent the yearly scramble when a new executive board takes charge. Safely archive performance summaries, internal guidelines, operational databases, and transition assets for next year's core team.",
    pill: "Data Integrity"
  }
]

export default function LearnMorePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Structural layout grid pattern accent identical to home */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20" />

      {/* Top Navigation Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 flex items-center justify-between border-b border-neutral-800 animate-fade-in-up">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <span className="text-xs font-bold tracking-widest text-neutral-400">ELEV8ED PLATFORM DEEP DIVE</span>
      </div>

      {/* Main Content Sections */}
      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-in-up [animation-delay:150ms]">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Engineered to remove structural administrative chaos.
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Elev8Ed maps the exact workflows of complex student organizations into an elegant, scalable software framework. Here is how it fundamentally modifies operations.
          </p>
        </div>

        {/* Detailed Modular Core Component Structures */}
        <div className="space-y-4 animate-fade-in-up [animation-delay:300ms]">
          {deepDives.map((item, index) => (
            <div 
              key={item.module}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:p-8 transition-all duration-300 hover:border-neutral-600"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-400">0{index + 1}.</span>
                  <h2 className="text-lg font-bold tracking-tight text-white">{item.module}</h2>
                </div>
                <span className="w-fit inline-flex items-center rounded-md bg-black px-2.5 py-0.5 text-[10px] font-medium text-neutral-300 border border-neutral-800">
                  {item.pill}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-neutral-200">{item.headline}</p>
                <p className="text-xs leading-relaxed text-neutral-400 max-w-3xl">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout Module */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center space-y-4 max-w-xl mx-auto animate-fade-in-up [animation-delay:450ms]">
          <h3 className="text-lg font-bold text-white">Ready to modernize your organization?</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Deploy your primary committee dashboard workspace in less than five minutes.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-6 text-xs font-semibold text-black shadow transition-all hover:bg-neutral-200 hover:scale-[1.02]"
            >
              Initialize Workspace Token
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Footer */}
      <div className="border-t border-neutral-900 py-6 text-center text-[10px] text-neutral-600 animate-fade-in-up [animation-delay:600ms]">
        Elev8Ed Architecture Documentation · Built for Real Performance
      </div>
    </main>
  )
}