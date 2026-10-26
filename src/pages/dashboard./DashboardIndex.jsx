
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../contexts/UserContext'
import { toast } from 'sonner'
import {
  ArrowRight,
  Sparkles,
  Dumbbell,
  CalendarDays,
  Target,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  History,
  UserRound,
  RefreshCw,
  Activity,
  CheckCircle2,
  Utensils,
} from 'lucide-react'

const DashboardIndex = () => {
  const navigate = useNavigate()
  const { profile, getUserProfile } = useContext(userContext)

  const [workoutPlan, setWorkoutPlan] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState(true)
  const [openIndex, setOpenIndex] = useState(0)

  // Read the token as stored by LoginPage.
  const token = JSON.parse(localStorage.getItem('token'))

  const getLatestFitPlan = async () => {
    const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"

    try {
      const res = await fetch(`${API_URL}/fit-plan/latest`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()

      if (!res.ok) {
        setWorkoutPlan([])
        return
      }

      // Safely handle users who do not have a plan yet.
      const weeklyPlan = result?.plan?.weeklyPlan
      const workouts = Array.isArray(weeklyPlan)
        ? weeklyPlan[0]?.workout
        : []

      setWorkoutPlan(Array.isArray(workouts) ? workouts : [])
    } catch (error) {
      console.error('Error fetching fitness plan:', error)
      setWorkoutPlan([])
    } finally {
      setLoadingPlan(false)
    }
  }

  useEffect(() => {
    if (!token) {
      toast.error('Please log in to access your dashboard.')
      navigate('/login', { replace: true })
      return
    }

    getLatestFitPlan()

    if (typeof getUserProfile === 'function') {
      getUserProfile()
    }
    // Load dashboard data when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startPlanBuildUp = () => {
    navigate('/dashboard/generate-plan')
  }

  const toggleAccordion = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  const generateFitPlan = async () => {
    if (submitting) return

    setSubmitting(true)

    try {
      const res = await fetch('http://localhost:7707/api/fit-plan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()

      if (!res.ok || !result.status) {
        toast.error(result.message || 'Unable to create your fitness plan.')
        return
      }

      toast.success(result.message || 'Your fitness plan is ready!')

      // Reload the latest plan so the new workouts appear.
      await getLatestFitPlan()
    } catch (error) {
      console.error('Fitness plan creation error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const totalExercises = workoutPlan.reduce((total, day) => {
    return total + (Array.isArray(day.exercises) ? day.exercises.length : 0)
  }, 0)

  const displayName = profile?.name?.trim()?.split(' ')[0] || 'there'
  const goal = profile?.goal
    ? profile.goal.replaceAll('_', ' ')
    : 'your fitness goals'

  const subscription = profile?.subscription
  const subscriptionStatus =
    typeof subscription === 'object' && subscription !== null
      ? subscription.status
      : subscription

  const subscriptionPlan =
    typeof subscription === 'object' && subscription !== null
      ? subscription.plan
      : null

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      {/* Welcome banner */}
      <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151f32] via-[#10172a] to-[#17132b] p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-[#b9f65a]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b9f65a]/20 bg-[#b9f65a]/10 px-3 py-1.5 text-xs font-semibold text-[#b9f65a]">
              <Sparkles size={14} />
              YOUR PERSONAL FITNESS SPACE
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let's get stronger,
              <br className="hidden sm:block" />{' '}
              <span className="text-[#b9f65a]">{displayName}.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Every step counts. Check your workout plan, stay consistent,
              and keep moving towards {goal}.
            </p>

            <button
              type="button"
              onClick={startPlanBuildUp}
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9f65a] px-5 py-3.5 text-sm font-bold text-[#080d1b] transition duration-300 hover:-translate-y-0.5 hover:bg-[#cbff7e] hover:shadow-lg hover:shadow-[#b9f65a]/10"
            >
              <Sparkles size={17} />
              Build My Plan
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="hidden shrink-0 items-center justify-center lg:flex">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-[#b9f65a]/20 bg-white/[0.03]">
              <div className="absolute inset-3 rounded-full border border-dashed border-[#b9f65a]/20" />
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#b9f65a]/10 text-[#b9f65a]">
                <Dumbbell size={52} strokeWidth={1.5} />
              </div>
              <span className="absolute right-0 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171d2e] text-[#b9f65a] shadow-xl">
                <Flame size={21} />
              </span>
              <span className="absolute bottom-3 left-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#171d2e] text-purple-300 shadow-xl">
                <Target size={21} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section heading */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#b9f65a]">
              YOUR OVERVIEW
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your fitness space
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              A quick look at your current plan and goals.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/dashboard/profile')}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-[#b9f65a]"
          >
            View profile <ArrowRight size={16} />
          </button>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b9f65a]/30">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b9f65a]/10 text-[#b9f65a]">
                <Dumbbell size={21} />
              </span>
              <Activity size={17} className="text-slate-600" />
            </div>
            <p className="mt-5 text-sm text-slate-400">Workout days in plan</p>
            <p className="mt-1 text-3xl font-extrabold text-white">
              {loadingPlan ? '—' : workoutPlan.length}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {workoutPlan.length === 1 ? 'Day available' : 'Days available'}
            </p>
          </div>

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-400/10 text-purple-300">
                <CheckCircle2 size={21} />
              </span>
              <Target size={17} className="text-slate-600" />
            </div>
            <p className="mt-5 text-sm text-slate-400">Planned exercises</p>
            <p className="mt-1 text-3xl font-extrabold text-white">
              {loadingPlan ? '—' : totalExercises}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Across the displayed workout plan
            </p>
          </div>

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                <Target size={21} />
              </span>
              <Sparkles size={17} className="text-slate-600" />
            </div>
            <p className="mt-5 text-sm text-slate-400">Your fitness goal</p>
            <p className="mt-1 text-xl font-bold capitalize text-white">
              {profile?.goal?.replaceAll('_', ' ') || 'Not set yet'}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Your personal target
            </p>
          </div>

          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-400/30">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                <CalendarDays size={21} />
              </span>
              <Clock size={17} className="text-slate-600" />
            </div>
            <p className="mt-5 text-sm text-slate-400">Subscription</p>
            <p className="mt-1 text-xl font-bold capitalize text-white">
              {subscriptionStatus || 'Not available'}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {subscriptionPlan
                ? `${subscriptionPlan} plan`
                : 'Your membership status'}
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Workout plan */}
        <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#b9f65a]/10 text-[#b9f65a]">
                <Dumbbell size={22} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white sm:text-xl">
                  Your workout plan
                </h2>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Open a day to view its exercises and targets.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={startPlanBuildUp}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-[#b9f65a]/30 hover:text-[#b9f65a]"
            >
              <RefreshCw size={14} />
              Manage plan
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {loadingPlan ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.03]"
                  />
                ))}
                <p className="pt-2 text-center text-xs text-slate-500">
                  Loading your workout plan...
                </p>
              </div>
            ) : workoutPlan.length > 0 ? (
              <div className="space-y-3">
                {workoutPlan.map((day, index) => {
                  const exercises = Array.isArray(day.exercises)
                    ? day.exercises
                    : []
                  const isOpen = openIndex === index

                  return (
                    <div
                      key={`${day.day || 'day'}-${index}`}
                      className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                        isOpen
                          ? 'border-[#b9f65a]/25 bg-[#b9f65a]/[0.035]'
                          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                              isOpen
                                ? 'bg-[#b9f65a] text-[#080d1b]'
                                : 'bg-white/[0.06] text-slate-300'
                            }`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-white">
                              {day.day || `Workout day ${index + 1}`}
                            </h3>
                            <p className="mt-1 text-xs text-slate-400">
                              {exercises.length}{' '}
                              {exercises.length === 1
                                ? 'exercise'
                                : 'exercises'}
                            </p>
                          </div>
                        </div>

                        <span className="flex shrink-0 items-center gap-2 text-slate-400">
                          <span className="hidden text-xs sm:inline">
                            {isOpen ? 'Hide exercises' : 'View exercises'}
                          </span>
                          {isOpen ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="space-y-2 px-3 pb-3 sm:px-4 sm:pb-4">
                          {exercises.length > 0 ? (
                            exercises.map((exercise, exerciseIndex) => (
                              <div
                                key={`${exercise.name || 'exercise'}-${exerciseIndex}`}
                                className="flex flex-col justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#080d1b]/70 p-3.5 sm:flex-row sm:items-center sm:px-4"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#b9f65a]/10 text-[#b9f65a]">
                                    <CheckCircle2 size={16} />
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-slate-200">
                                      {exercise.name || 'Unnamed exercise'}
                                    </p>
                                    {exercise.description && (
                                      <p className="mt-1 text-xs leading-5 text-slate-500">
                                        {exercise.description}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 pl-11 sm:pl-0">
                                  <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                                    <span className="text-slate-200">
                                      {exercise.sets ?? '—'}
                                    </span>{' '}
                                    sets
                                  </span>
                                  <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                                    <span className="text-slate-200">
                                      {exercise.reps ?? '—'}
                                    </span>{' '}
                                    reps
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="rounded-xl bg-white/[0.03] p-4 text-sm text-slate-400">
                              No exercises have been added to this day yet.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#b9f65a]/15 bg-[#b9f65a]/[0.06] text-[#b9f65a]">
                  <Dumbbell size={30} strokeWidth={1.5} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-white">
                  Your journey starts here
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  You don't have a workout plan to display yet. Create a
                  personalized plan to get started with your fitness journey.
                </p>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={generateFitPlan}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9f65a] px-5 py-3.5 text-sm font-bold text-[#080d1b] transition hover:bg-[#cbff7e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={17} className="animate-spin" />
                      Creating your plan...
                    </>
                  ) : (
                    <>
                      <Sparkles size={17} />
                      Create my first plan
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={startPlanBuildUp}
                  className="mt-4 text-xs font-medium text-slate-400 transition hover:text-[#b9f65a]"
                >
                  Explore plan options
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Right-side actions */}
        <aside className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-[#b9f65a]/15 bg-gradient-to-br from-[#b9f65a]/[0.08] to-transparent p-5 sm:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b9f65a]/15 text-[#b9f65a]">
              <Sparkles size={22} />
            </span>

            <h3 className="mt-5 text-xl font-bold text-white">
              Ready for your next step?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Create or refine your personalized fitness and nutrition plan.
            </p>

            <button
              type="button"
              onClick={startPlanBuildUp}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b9f65a] px-4 py-3 text-sm font-bold text-[#080d1b] transition hover:bg-[#cbff7e]"
            >
              Generate a plan <ArrowRight size={17} />
            </button>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
            <h3 className="font-bold text-white">Quick access</h3>
            <p className="mt-1 text-xs text-slate-500">
              Jump straight to what you need.
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard/profile')}
                className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-left transition hover:border-[#b9f65a]/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
                  <UserRound size={18} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-200">
                    My profile
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Review your fitness details
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#b9f65a]"
                />
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard/history')}
                className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-left transition hover:border-[#b9f65a]/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-400/10 text-purple-300">
                  <History size={18} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-200">
                    Plan history
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    View your previous plans
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#b9f65a]"
                />
              </button>

              <button
                type="button"
                onClick={startPlanBuildUp}
                className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-left transition hover:border-[#b9f65a]/20 hover:bg-white/[0.04]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-400/10 text-orange-300">
                  <Utensils size={18} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-200">
                    Plan generator
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Personalize your next plan
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-[#b9f65a]"
                />
              </button>
            </div>
          </section>

          <p className="px-1 text-center text-xs leading-5 text-slate-600">
            Consistency beats perfection. Keep showing up for yourself.
          </p>
        </aside>
      </div>
    </div>
  )
}

export default DashboardIndex
