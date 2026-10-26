import React from 'react'
import { useNavigate } from 'react-router-dom'
import heroSectionImg from "../assets/hero-section.jpeg"


const features = [
  {
    number:"01",
    icon: "🥗",
    title:"AI Meal Planning",
    description: "Discover personalized meal plans based on your goals, dietary preferences, and daily nutritional needs.",
    color: "from-lime-300/20 to-green-500/5",
    accent: "text-lime-300"
  },
  {
    number:"02",
    icon: "🏋️",
    title:"Smart Workouts",
    description: "Get workout routines tailored to your fitness level, available time, and personal ambitions.",
    color: "from-violent-400/20 to-purple-500/5",
    accent: "text-violent-300"
  },
  {
    number:"03",
    icon: "📊",
    title:"Track Your Progress",
    description: "Stay motivated as you monitor your goals, build healthy habits, and celebrate your progress.",
    color: "from-cyan-300/20 to-blue-500/5",
    accent: "text-cyan-300"
  },
  {
    number:"04",
    icon: "✨",
    title:"Your Fitness Coach",
    description: "Get a more personalized fitness experience with intelligent assistance whenever you need guidance.",
    color: "from-pink-400/20 to-rose-500/5",
    accent: "text-pink-300"
  }
]

const steps = [
  {
    number: "01",
    title: "Tell us about yourself",
    description: "Share your fitness goals, activity level, food preferences, and available workout time."
  },
  {
    number: "02",
    title: "Let AI build your plan",
    description: "Get a personalized fitness and nutrition plan designed around the information you provide."
  },
  {
    number: "03",
    title: "Start your journey",
    description: "Follow your plan, track your progress, and keep working toward your personal goals."
  }
]

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <main className="overflow-hidden bg-[#0b1020] text-white">
      {/* Hero */}
      <section className='relative isolate'>
        {/* Background Effects */}
        <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />
          <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-violet-500/15 blur-[130px]" />
          <div className='absolute inset-0 opacity-[0.07]' style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: "28px 28px" }} />
        </div>
        <div className='mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-2 lg:gap-10 lg:px-12 lg:pb-32 lg:pt-28'>
          {/* Hero Copy */}
          <div className='animate-[fadeUp_0.8s_ease-out_both]'>
            <div className='mb-7 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.07] px-4 py-2 text-sm text-lime-200'>
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300" />
              YOUR PERSONAL AI FITNESS COMPANION
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your goals.
              <br />
              Your Journey.
              <br />
              <span className='bg-gradient-to-r from-lime-300 via-lime-200 to-emerald-300 bg-clip-text text-transparent'>
                Your best self.
              </span>
            </h1>
            <p className='mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg'>Meet a smarter way to get fit. FITGENIE helps you discover personalized meal plans, build effective workouts, and take control of your fitness journey with AI.</p>
            <div className='mt-9 flex flex-col gap-4 sm:flex-row'>
              <button onClick={() => navigate("/signup")} className='group inline-flex items-center justify-center gap-3 rounded-2xl bg-lime-300 px-7 py-4 font-bold text-slate-950 shadow-lg shadow-lime-300/10 transition duration-300 hover:-translate-y-1 hover:bg-lime-200 hover:shadow-xl hover:shadow-lime-300/20 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 focus:ring-offset-[#0b1020]' >
                Build My Program
                <span className='transition-transform duration-300 group-hover:translate-x-1'>→</span>
              </button>
              <button onClick={() => document.getElementById("features") ?.scrollIntoView({behavior: "smooth"})} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/[0.08]">
                Explore Features
                <span>↓</span>
              </button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className='flex items-center gap-2'>
                <span className='text-lime-300'>✓</span>
                Personalized plans
              </span>
              <span className='flex items-center gap-2'>
                <span className='text-lime-300'>✓</span>
                AI-powered guidance
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-xl animate-[fadeUp_1s_ease-out_0.15s_both] lg:ml-auto">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-lime-300/10 via-violet-500/10 to-cyan-400/10 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
              <div className='flex items-center justify-between px-3 pb-4 pt-2'>
                <div>
                  <p className='text-xs font-medium uppercase tracking-[0.2em] text-lime-300'>FITGENIE AI</p>
                  <h2 className='mt-1 text-lg font-bold sm:text-xl'>Your wellness overview</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-300/20 bg-lime-300/10 text-xl">✨</div>
              </div>
              <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#121a2c]'>
                <img src={heroSectionImg} alt='FITGENIE personalized meal planner preview' className="h-64 w-full object-cover object-center sm:h-80" />
                <div className='grid grid-cols-2 gap-3 p-4 sm:p-5'>
                  <div className='rounded-2xl border border-lime-300/10 bg-lime-300/[0.06] p-4'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='text-xs text-slate-400'>Nutrition</span>
                      <span>🥑</span>
                    </div>
                    <p className='mt-2 text-lg font-bold sm:text-xl'>Eat Smarter</p>
                    <p className='mt-1 text-xs text-lime-300'>Meals tailored to you</p>
                  </div>
                  <div className='rounded-2xl border border-violent-300/10 bg-violent-400/[0.06] p-4'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='text-xs text-slate-400'>Training</span>
                      <span>💪</span>
                    </div>
                    <p className='mt-2 text-lg font-bold sm:text-xl'>Move better</p>
                    <p className='mt-1 text-xs text-violet-300'>Workouts built for you</p>
                  </div>
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute -right-2 top-24 animate-[float_4s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-[#192238] p-3 shadow-2xl sm:-right-6 sm:p-4">
                <div className='flex items-center gap-3'>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-400 text-lg text-slate-950">✦</div>
                  <div cla>
                    <p className='text-sm font-bold'>AI-powered</p>
                    <p className='text-xs text-slate-400'>Made for your goals</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-2 bottom-42 animate-[float_4.5s_ease-in-out_0.5s_infinite] rounded-2xl border border-white/10 bg-[#192238] p-3 shadow-2xl sm:-left-6 sm:p-4">
                <div className='flex items-center gap-3'>
                  <span className='text-2xl'>🎯</span>
                  <div>
                    <p className='text-sm font-bold'>One step at a time</p>
                    <p className='text-xs text-slate-400'>progress over perfection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>
      
      {/* Value strip */}
      <section>
        <div>
          {[
            {
              icon: "🥗",
              title: "Nutrition that fits you",
              description: "Meals shapes around your preferences"
            },
            {
              icon: "🏃",
              title: "Movement that motivates",
              description: "Training built around your lifestyle"
            },
            {
              icon: "🧠",
              title: "Smarter fitness decisions",
              description: "AI-powered personalized guidance"
            }
          ].map((item) => (
            <div key={item.title} className='flex items-center gap-4 sm:justify-center'>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl">{item.icon}</div>
              <div>
                <h3 className='font-semibold'>{item.title}</h3>
                <p className='mt-1 text-sm text-slate-400'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEAUTURES */}
      <section>
        <div className="pointer-events-none absolute right-0 top-20 -z-0 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]" />
        <div className='relative mx-auto max-w-7xl'>
          <div className='mx-auto max-w-2xl text-center'>
            <span className='text-sm font-bold uppercase tracking-[0.25em] text-lime-300'>YOUR FITNESS TOOLKIT</span>
            <h2 className='mt-5 text-3xl font-black tracking-tight sm:text-5xl'>
              Everything you need.
              <br />
              <span className='text-slate-500'>One smarter experience</span>
            </h2>
            <p className='mt-6 leading-7 text-slate-400'>Your fitness journey is personal. Your tools should be too. Discover featuers designed to help you make progress on your terms</p>
          </div>
          <div>
            {features.map((feature) => (
              <article key={feature.number} className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${feature.color} p-6 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl hover:shadow-black/20`}>
                <div className='flex items-center justify-between'>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0b1020]/60 text-2xl transition duration-300 group-hover:scale-110">{feature.icon}</span>
                  <span className='text-sm font-semibold text-white/30'>{feature.number}</span>
                </div>
                <h3 className='mt-8 text-xl font-bold'>{feature.title}</h3>
                <p className='mt-4 text-sm leading-7 text-slate-400'>{feature.description}</p>
                <div>
                  Built around you
                  <span className='transition-transform group-hover:translate-x-1'>→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* HOW IT WORKS */}
      <section className="border-y border-white/[0.06] bg-[#101629] px-5 py-24 sm:px-8 sm:py-28 lg:px-12" >
        <div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-20'>
          <div>
            <span className='text-sm font-bold uppercase tracking-[0.25em] text-violet-300'>SIMPLE BY DESIGN</span>
            <h2 className='mt-5 text-3xl font-black leading-tight sm:text-5xl'>
              A better routine
              <br />
              starts with <span className='text-lime-300'>you.</span>
            </h2>
            <p>Getting started shouldn't feel complicated. Tell FITGENIE what you're working toward and take the first step toward a routine that fits your life.</p>
            <button onClick={() => navigate("/signup")} className='group mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-bold text-[#0b1020] transition duration-300 hover:-translate-y-1 hover:bg-lime-300'>
              Start your journey
              <span className='transition-transform group-hover:translate-x-1'>→</span>
            </button>
          </div>
          <div>
            {steps.map((step, index) => (
              <div key={step.number} className="group flex gap-5 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:border-lime-300/20 hover:bg-white/[0.045] sm:gap-6 sm:p-7">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition duration-300 group-hover:scale-105 ${index == 0 ? "bg-lime-300 text-slate-950" : index === 1 ? "bg-violet-400/15 text-violet-300" : "bg-cyan-300/15 text-cyan-300"}`}>{step.number}</div>
                <div>
                  <h3 className='text-lg font-bold sm:text-xl'>{step.title}</h3>
                  <p className='mt-3 text-sm leading-7 text-slate-400'>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='px-5 py-24 sm:px-8 sm:py-32 lg:px-12'>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-lime-200/15 bg-gradient-to-br from-lime-300/[0.12] via-[#141c2d] to-violet-500/[0.12] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-lime-300/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />
          <div className='relative'>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-lime-200">
              <span>✦</span>
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Stop guessing.
              <br />
              Start building <span className='text-lime-300'>your future.</span>
            </h2>
            <p>Create your account and discover a more personalized approach to fitness, nutrition, and everyday nutrition, and everyday progress.</p>
            <button onClick={() => navigate("/signup")} className="group mt-9 inline-flex items-center justify-center gap-3 rounded-2xl bg-lime-300 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-lime-300/10 transition duration-300 hover:-translate-y-1 hover:bg-lime-200 hover:shadow-xl hover:shadow-lime-300/20">
              Create My Free Account
              <span className='transition-transform group-hover:translate-x-1'>→</span>
            </button>
            <p>Your goals. Your pace. Your journey.</p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default LandingPage