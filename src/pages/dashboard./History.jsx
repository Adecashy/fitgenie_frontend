
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Crown,
  Dumbbell,
  History as HistoryIcon,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Star,
  Target,
  Utensils,
  Zap,
} from 'lucide-react'
import { userContext } from '../../contexts/UserContext'

const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '₦10,000',
    period: '/ month',
    description: 'A simple way to get started.',
    icon: Zap,
    features: [
      'Basic meal plan',
      'Limited AI coach access',
      'Weekly progress tracking',
      'Email support',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: '₦28,000',
    period: '/ 3 months',
    description: 'More support for your fitness journey.',
    icon: Crown,
    popular: true,
    features: [
      'Meal plans with alternatives',
      'Unlimited AI coach chat',
      'Advanced progress tracking',
      'Priority support',
      'Merchandise and supplements',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '₦99,999',
    period: '/ year',
    description: 'For long-term goals and consistency.',
    icon: Star,
    features: [
      'Multi-phase fitness program',
      'Monthly custom meal plans',
      'Unlimited AI coach chat',
      'Monthly one-on-one check-ins',
      'Exclusive programs and form analysis',
      'Annual fitness report',
      'Premium rewards',
    ],
  },
]

const tabs = [
  { id: 'history', label: 'Plan history', icon: HistoryIcon },
  { id: 'premium', label: 'Premium plans', icon: Crown },
]


const formatLabel = (value) => {
  if (!value) return 'Not specified'

  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
  }
  
  const formatDate = (value) => {
    if (!value) return 'Date unavailable'
    
    const date = new Date(value)
    
    if (Number.isNaN(date.getTime())) return 'Date unavailable'
    
    return date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }
  
  const History = () => {
  const { profile, getUserProfile } = useContext(userContext)
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('history')
  const [plansHistory, setPlansHistory] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [historyError, setHistoryError] = useState(false)
  const [submittingPlan, setSubmittingPlan] = useState(null)

  const getPlanHistory = async () => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
      setPlansHistory([])
      setHistoryError(true)
      setLoadingHistory(false)
      return
    }

    setLoadingHistory(true)
    setHistoryError(false)

    try {
      // Connect this URL to your actual history endpoint.
      const res = await fetch(`${API_URL}/fit-plan/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()
      // console.log(result);

      if (!res.ok || result.success === false) {
        throw new Error(result.message || 'Could not load plan history.')
      }

      // Supports common response formats.
      const history =
        result.plans ??
        result.history ??
        result.data?.plans ??
        result.data ??
        []

      setPlansHistory(Array.isArray(history) ? history : [])
    } catch (error) {
      console.error('Plan history error:', error)
      setPlansHistory([])
      setHistoryError(true)
    } finally {
      setLoadingHistory(false)
    }
  }

  useEffect(() => {
    getPlanHistory(),
    getUserProfile()
  }, [])

  
  const initializeSubscription = async (plan) => {
    if (submittingPlan) return

    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
      toast.error('Please log in to choose a subscription.')
      navigate('/login')
      return
    }

    setSubmittingPlan(plan)

    try {
      const res = await fetch(`${API_URL}/subscription/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      })

      const result = await res.json()
      

      if (!res.ok || !result.status) {
        throw new Error(
          result.message || 'Unable to initialize your payment.'
        )
      }

      const authorizationUrl = result.data?.authorization_url

      if (!authorizationUrl) {
        throw new Error('The payment checkout URL was not returned.')
      }

      toast.success('Redirecting to secure checkout...')
      window.location.assign(authorizationUrl)
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error(error.message || 'Something went wrong.')
      setSubmittingPlan(null)
    }
  }

  const getPlanTitle = (plan) => {
    return (
      plan?.title ||
      plan?.name ||
      plan?.planName ||
      plan?.goal ||
      'Personalized fitness plan'
    )
  }

  const getPlanDate = (plan) => {
    return (
      plan?.createdAt ||
      plan?.created_at ||
      plan?.updatedAt ||
      plan?.date
    )
  }

  const getPlanId = (plan, index) => {
    return plan?._id || plan?.id || `plan-${index}`
  }

  const getWorkoutCount = (plan) => {
    const workoutList =
      plan?.weeklyPlan?.flatMap((week) => week?.workout || []) ||
      plan?.plan?.weeklyPlan?.flatMap((week) => week?.workout || []) ||
      plan?.workoutPlan ||
      []

    return Array.isArray(workoutList) ? workoutList.length : 0
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Heading */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#b9f65a]"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </button>

        <div className="flex items-center gap-2">
          <Sparkles size={19} className="text-[#b9f65a]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f65a]">
            Your fitness journey
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          History & <span className="text-[#b9f65a]">Premium</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Review your generated plans, track your journey, and explore
          membership options designed to support your goals.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-[#101729] p-2">
        {tabs.map(({ id, label, icon: Icon }) => {
          const selected = activeTab === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:flex-none sm:px-6 ${
                selected
                  ? 'bg-[#b9f65a] text-[#101708]'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          )
        })}
      </div>

      {/* History section */}
      {activeTab === 'history' && (
        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Your generated plans
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Revisit your fitness plans whenever you need them.
              </p>
            </div>

            <button
              type="button"
              onClick={getPlanHistory}
              disabled={loadingHistory}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-[#b9f65a]/30 hover:text-[#b9f65a] disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw
                size={15}
                className={loadingHistory ? 'animate-spin' : ''}
              />
              Refresh
            </button>
          </div>

          {loadingHistory ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#101729]">
              <LoaderCircle
                size={34}
                className="animate-spin text-[#b9f65a]"
              />
              <p className="mt-4 text-sm text-slate-400">
                Loading your plan history...
              </p>
            </div>
          ) : historyError ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#101729] px-5 text-center">
              <HistoryIcon size={34} className="text-slate-500" />
              <h3 className="mt-4 text-lg font-bold text-white">
                History couldn't load
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Check if you're logged in.
              </p>
              <button
                type="button"
                onClick={getPlanHistory}
                className="mt-5 rounded-xl bg-[#b9f65a] px-5 py-3 text-sm font-bold text-[#101708] transition hover:bg-[#c9ff72]"
              >
                Try again
              </button>
            </div>
          ) : plansHistory.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-[#101729] px-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#b9f65a]/10 text-[#b9f65a]">
                <Dumbbell size={29} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                Your journey starts here
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                You haven't generated any plans yet, or no history is
                available. Create a personalized plan to get started.
              </p>

              <button
                type="button"
                onClick={() => navigate('/dashboard/generate-plan')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#b9f65a] px-5 py-3 text-sm font-bold text-[#101708] transition hover:bg-[#c9ff72]"
              >
                Generate a plan
                <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {plansHistory.map((plan, index) => {
                const workoutCount = getWorkoutCount(plan)

                return (
                  <article
                    key={getPlanId(plan, index)}
                    className="rounded-3xl border border-white/10 bg-[#101729] p-5 transition hover:border-[#b9f65a]/25 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b9f65a]/10 text-[#b9f65a]">
                        <Dumbbell size={22} />
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9f65a]/20 bg-[#b9f65a]/[0.06] px-3 py-1.5 text-xs font-medium text-[#b9f65a]">
                        <CheckCircle2 size={13} />
                        Generated
                      </span>
                    </div>

                    <h3 className="mt-5 break-words text-lg font-bold text-white">
                      {getPlanTitle(plan)}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={14} />
                      {formatDate(getPlanDate(plan))}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#080d1b] p-3">
                        <p className="text-xs text-slate-500">Fitness goal</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {formatLabel(
                            plan?.goal || profile?.goal
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#080d1b] p-3">
                        <p className="text-xs text-slate-500">
                          Workout days
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {workoutCount || '—'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate('/dashboard/generate-plan')
                      }
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#b9f65a]/30 hover:text-[#b9f65a]"
                    >
                      Open fitness plans
                      <ArrowRight size={16} />
                    </button>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )}

      {/* Premium section */}
      {activeTab === 'premium' && (
        <section className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151f32] via-[#101729] to-[#211637] px-5 py-9 text-center sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#b9f65a]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-purple-500/15 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b9f65a]/20 bg-[#b9f65a]/10 text-[#b9f65a]">
                <Crown size={27} />
              </div>

              <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
                Invest in your <span className="text-[#b9f65a]">best self.</span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Get more personalized plans, coaching, and tools to help
                you stay consistent with your fitness journey.
              </p>
            </div>
          </div>

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon
              const isSubmitting = submittingPlan === plan.id

              return (
                <article
                  key={plan.id}
                  className={`relative flex min-w-0 flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${
                    plan.popular
                      ? 'border-[#b9f65a]/50 bg-gradient-to-b from-[#b9f65a]/[0.08] to-[#101729]'
                      : 'border-white/10 bg-[#101729] hover:border-white/20'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#b9f65a] px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#101708]">
                      Popular choice
                    </div>
                  )}

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      plan.popular
                        ? 'bg-[#b9f65a]/15 text-[#b9f65a]'
                        : 'bg-white/[0.05] text-slate-300'
                    }`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    {plan.name}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-black text-white sm:text-4xl">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500">
                      {plan.period}
                    </span>
                  </div>

                  <div className="my-6 border-t border-white/10" />

                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    What's included
                  </p>

                  <ul className="flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-5 text-slate-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#b9f65a]/10 text-[#b9f65a]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    disabled={Boolean(submittingPlan)}
                    onClick={() => initializeSubscription(plan.id)}
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      plan.popular
                        ? 'bg-[#b9f65a] text-[#101708] hover:bg-[#c9ff72]'
                        : 'border border-white/10 bg-white/[0.04] text-white hover:border-[#b9f65a]/30'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                        Preparing checkout...
                      </>
                    ) : (
                      <>
                        Choose {plan.name.toLowerCase()}
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </article>
              )
            })}
          </div>

          <p className="text-center text-xs leading-5 text-slate-500">
            Review the subscription terms and payment details at checkout
            before completing your purchase.
          </p>
        </section>
      )}
    </div>
  )
}

export default History
