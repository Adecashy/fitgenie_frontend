
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dumbbell,
  Flame,
  Heart,
  Mail,
  Ruler,
  Sparkles,
  Target,
  UserRound,
  Utensils,
  Weight,
  Pencil,
  LoaderCircle,
} from 'lucide-react'
import { userContext } from '../../contexts/UserContext'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { profile, getUserProfile } = useContext(userContext)
  const [loading, setLoading] = useState(!profile)

  useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      try {
        await getUserProfile()
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [])

  const goToUpdateProfile = () => {
    navigate('/dashboard/update-profile')
  }

  const initials = profile?.name
    ? profile.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'FG'

  const formatValue = (value, suffix = '') => {
    if (value === undefined || value === null || value === '') {
      return 'Not set'
    }

    return `${value}${suffix}`
  }

  const formatLabel = (value) => {
    if (!value) return 'Not set'

    return String(value)
      .replaceAll('_', ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  }

  const details = [
    {
      label: 'Age',
      value: formatValue(profile?.age, ' years'),
      icon: CalendarDays,
    },
    {
      label: 'Gender',
      value: formatLabel(profile?.gender),
      icon: UserRound,
    },
    {
      label: 'Height',
      value: formatValue(profile?.height, ' cm'),
      icon: Ruler,
    },
    {
      label: 'Current weight',
      value: formatValue(profile?.weight, ' kg'),
      icon: Weight,
    },
  ]

  const fitnessDetails = [
    {
      label: 'Fitness goal',
      value: formatLabel(profile?.goal),
      icon: Target,
      color: 'text-[#b9f65a]',
      background: 'bg-[#b9f65a]/10',
    },
    {
      label: 'Diet preference',
      value: formatLabel(profile?.dietPreference),
      icon: Utensils,
      color: 'text-purple-300',
      background: 'bg-purple-400/10',
    },
    {
      label: 'Daily workout time',
      value: formatValue(profile?.timePerDay, ' minutes'),
      icon: Clock3,
      color: 'text-sky-300',
      background: 'bg-sky-400/10',
    },
    {
      label: 'Activity level',
      value: formatLabel(profile?.activityLevel),
      icon: Activity,
      color: 'text-orange-300',
      background: 'bg-orange-400/10',
    },
  ]

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <LoaderCircle
          size={38}
          className="animate-spin text-[#b9f65a]"
        />
        <p className="text-sm text-slate-400">
          Loading your profile...
        </p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04]">
          <UserRound size={34} className="text-[#b9f65a]" />
        </div>

        <h1 className="text-2xl font-bold text-white">
          Your profile is waiting
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
          We couldn't load your profile details. Try again or check your
          connection before continuing.
        </p>

        <button
          onClick={() => getUserProfile()}
          className="mt-6 rounded-xl bg-[#b9f65a] px-5 py-3 text-sm font-bold text-[#101708] transition hover:bg-[#c9ff72]"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#b9f65a]"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </button>

          <div className="flex items-center gap-2">
            <Sparkles size={19} className="text-[#b9f65a]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f65a]">
              Your personal space
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            My <span className="text-[#b9f65a]">Profile</span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Manage your personal details and fitness preferences to help
            FitGenie tailor your experience.
          </p>
        </div>

        <button
          onClick={goToUpdateProfile}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#b9f65a] px-5 py-3 text-sm font-bold text-[#101708] shadow-lg shadow-[#b9f65a]/10 transition hover:-translate-y-0.5 hover:bg-[#c9ff72] sm:self-auto"
        >
          <Pencil size={16} />
          Edit profile
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Profile hero card */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#131e31] via-[#101729] to-[#17142b] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#b9f65a]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.8rem] border border-[#b9f65a]/30 bg-[#b9f65a]/10 text-3xl font-black text-[#b9f65a] shadow-lg shadow-black/20">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                {profile.name || 'FitGenie Member'}
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full border border-[#b9f65a]/20 bg-[#b9f65a]/10 px-2.5 py-1 text-xs font-medium text-[#b9f65a]">
                <CheckCircle2 size={13} />
                Member
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 break-all text-sm text-slate-400">
              <Mail size={16} className="shrink-0 text-slate-500" />
              {profile.email || 'No email provided'}
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Your journey, your goals, your progress. Keep your information
              up to date for a more personalized fitness experience.
            </p>
          </div>
        </div>
      </section>

      {/* Personal information */}
      <section className="rounded-3xl border border-white/10 bg-[#101729] p-5 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <UserRound size={19} className="text-[#b9f65a]" />
              <h2 className="text-lg font-bold text-white">
                Personal information
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Your basic details at a glance.
            </p>
          </div>

          <button
            onClick={goToUpdateProfile}
            aria-label="Edit personal information"
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-slate-300 transition hover:border-[#b9f65a]/30 hover:text-[#b9f65a]"
          >
            <Pencil size={16} />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.07] bg-[#080d1b]/70 p-4 transition hover:border-white/15"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-slate-300">
                <Icon size={19} />
              </div>

              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 break-words text-base font-semibold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fitness preferences */}
      <section className="rounded-3xl border border-white/10 bg-[#101729] p-5 sm:p-7">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Flame size={20} className="text-[#b9f65a]" />
            <h2 className="text-lg font-bold text-white">
              Fitness & lifestyle
            </h2>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Your preferences help shape your personalized plans.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fitnessDetails.map(
            ({ label, value, icon: Icon, color, background }) => (
              <div
                key={label}
                className="flex min-w-0 items-start gap-4 rounded-2xl border border-white/[0.07] bg-[#080d1b]/70 p-4 sm:p-5"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${background} ${color}`}
                >
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 break-words text-base font-semibold text-white">
                    {value}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="flex flex-col gap-5 rounded-3xl border border-[#b9f65a]/15 bg-gradient-to-r from-[#b9f65a]/[0.08] to-purple-500/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b9f65a]/10 text-[#b9f65a]">
            <Dumbbell size={23} />
          </div>

          <div>
            <h3 className="font-bold text-white">
              Ready for your next milestone?
            </h3>
            <p className="mt-1 max-w-lg text-sm leading-6 text-slate-400">
              Keep your fitness information current so your plans match
              your needs and goals.
            </p>
          </div>
        </div>

        <button
          onClick={goToUpdateProfile}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#b9f65a]/30 bg-[#b9f65a]/10 px-4 py-3 text-sm font-semibold text-[#b9f65a] transition hover:bg-[#b9f65a]/20"
        >
          Update details
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  )
}

export default ProfilePage
