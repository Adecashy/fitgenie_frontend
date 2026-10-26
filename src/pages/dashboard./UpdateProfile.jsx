
import React, { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Activity,
  Target,
  Utensils,
  Clock3,
  Ruler,
  Weight,
  CalendarDays,
  Sparkles,
  Save,
  LoaderCircle,
} from 'lucide-react'
import { userContext } from '../../contexts/UserContext'

const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"

const schema = yup.object({
  name: yup.string().trim().required('Name is required'),
  age: yup
    .number()
    .typeError('Enter a valid age')
    .integer('Age must be a whole number')
    .min(13, 'Age must be at least 13')
    .max(120, 'Enter a valid age')
    .required('Age is required'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female'], 'Select a valid gender'),
  height: yup
    .number()
    .typeError('Enter your height')
    .positive('Height must be greater than zero')
    .required('Height is required'),
  weight: yup
    .number()
    .typeError('Enter your weight')
    .positive('Weight must be greater than zero')
    .required('Weight is required'),
  goal: yup
    .string()
    .required('Fitness goal is required')
    .oneOf(['weight loss', 'weight gain']),
  dietPreference: yup
    .string()
    .required('Diet preference is required')
    .oneOf([
      'vegetarian',
      'balanced',
      'vegan',
      'high_protein',
      'gluten_free',
      'none',
    ]),
  timePerDay: yup
    .number()
    .typeError('Enter your daily workout time')
    .integer('Enter time in whole minutes')
    .min(1, 'Workout time must be at least 1 minute')
    .max(300, 'Workout time cannot exceed 300 minutes')
    .required('Daily workout time is required'),
  activityLevel: yup
    .string()
    .required('Activity level is required')
    .oneOf(['light', 'sedentary', 'moderate', 'active']),
})

const inputClass = (hasError = false) =>
  `mt-2 w-full rounded-xl border ${
    hasError
      ? 'border-red-400/60 focus:border-red-400'
      : 'border-white/10 focus:border-[#b9f65a]/60'
  } bg-[#080d1b] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-[#b9f65a]/10`

const labelClass = 'text-sm font-medium text-slate-300'

const Field = ({
  label,
  name,
  icon: Icon,
  register,
  error,
  type = 'text',
  placeholder,
  suffix,
  ...props
}) => (
  <div className="min-w-0">
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>

    <div className="relative">
      {Icon && (
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(
          name,
          type === 'number' ? { valueAsNumber: true } : {}
        )}
        {...props}
        className={`${inputClass(Boolean(error))} ${
          Icon ? 'pl-10' : ''
        } ${suffix ? 'pr-14' : ''}`}
      />

      {suffix && (
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          {suffix}
        </span>
      )}
    </div>

    {error && (
      <p className="mt-1.5 text-xs text-red-400">{error.message}</p>
    )}
  </div>
)

const SelectField = ({
  label,
  name,
  icon: Icon,
  register,
  error,
  options,
}) => (
  <div className="min-w-0">
    <label htmlFor={name} className={labelClass}>
      {label}
    </label>

    <div className="relative">
      {Icon && (
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
        />
      )}

      <select
        id={name}
        {...register(name)}
        className={`${inputClass(Boolean(error))} ${
          Icon ? 'pl-10' : ''
        } cursor-pointer`}
      >
        <option value="" className="bg-[#101729]">
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#101729]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>

    {error && (
      <p className="mt-1.5 text-xs text-red-400">{error.message}</p>
    )}
  </div>
)

const UpdateProfile = () => {
  const { profile, getUserProfile } = useContext(userContext)
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(!profile)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      goal: '',
      dietPreference: '',
      timePerDay: '',
      activityLevel: '',
    },
  })

  useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      try {
        await getUserProfile()
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        if (mounted) setLoadingProfile(false)
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? '',
        age: profile.age ?? '',
        gender: profile.gender ?? '',
        height: profile.height ?? '',
        weight: profile.weight ?? '',
        goal: profile.goal ?? '',
        dietPreference: profile.dietPreference ?? '',
        timePerDay: profile.timePerDay ?? '',
        activityLevel: profile.activityLevel ?? '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data) => {
    const token = JSON.parse(localStorage.getItem('token'))

    if (!token) {
      toast.error('Your session has expired. Please log in again.')
      navigate('/login')
      return
    }

    if (!profile?._id) {
      toast.error('Unable to identify your profile. Please try again.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(
        `${API_URL}/users/${profile._id}/profile`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to update your profile.')
      }

      toast.success('Profile updated successfully!')

      // Refresh the shared context so other dashboard pages get the latest data.
      await getUserProfile()

      navigate('/dashboard/profile')
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error(error.message || 'Failed to update your profile.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingProfile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <LoaderCircle size={36} className="animate-spin text-[#b9f65a]" />
        <p className="text-sm text-slate-400">Loading your information...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center text-center">
        <UserRound size={40} className="mb-4 text-[#b9f65a]" />
        <h2 className="text-2xl font-bold text-white">
          Profile unavailable
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          We couldn't load your information. Please try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-[#b9f65a] px-5 py-3 text-sm font-bold text-[#101708]"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-8">
      {/* Heading */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/dashboard/profile')}
          className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#b9f65a]"
        >
          <ArrowLeft size={16} />
          Back to profile
        </button>

        <div className="flex items-center gap-2">
          <Sparkles size={19} className="text-[#b9f65a]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b9f65a]">
            Personalize your experience
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Update your <span className="text-[#b9f65a]">profile</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          Keep your information up to date so FitGenie can better tailor
          your fitness and nutrition plans to your needs.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal details */}
        <section className="rounded-3xl border border-white/10 bg-[#101729] p-5 sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#b9f65a]/10 text-[#b9f65a]">
              <UserRound size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Let's make sure your basic details are correct.
              </p>
            </div>
          </div>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <Field
              label="Full name"
              name="name"
              icon={UserRound}
              register={register}
              error={errors.name}
              placeholder="Enter your full name"
            />

            <Field
              label="Age"
              name="age"
              type="number"
              icon={CalendarDays}
              register={register}
              error={errors.age}
              placeholder="e.g. 25"
              min="13"
              max="120"
            />

            <SelectField
              label="Gender"
              name="gender"
              icon={UserRound}
              register={register}
              error={errors.gender}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />

            <Field
              label="Height"
              name="height"
              type="number"
              icon={Ruler}
              register={register}
              error={errors.height}
              placeholder="e.g. 175"
              suffix="cm"
              min="1"
              step="any"
            />

            <Field
              label="Weight"
              name="weight"
              type="number"
              icon={Weight}
              register={register}
              error={errors.weight}
              placeholder="e.g. 70"
              suffix="kg"
              min="1"
              step="any"
            />
          </div>
        </section>

        {/* Fitness preferences */}
        <section className="rounded-3xl border border-white/10 bg-[#101729] p-5 sm:p-8">
          <div className="mb-7 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
              <Activity size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Fitness & lifestyle
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Tell us what you're working toward and how you like to train.
              </p>
            </div>
          </div>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <SelectField
              label="Fitness goal"
              name="goal"
              icon={Target}
              register={register}
              error={errors.goal}
              options={[
                { value: 'weight loss', label: 'Weight loss' },
                { value: 'weight gain', label: 'Weight gain' },
              ]}
            />

            <SelectField
              label="Diet preference"
              name="dietPreference"
              icon={Utensils}
              register={register}
              error={errors.dietPreference}
              options={[
                { value: 'balanced', label: 'Balanced' },
                { value: 'vegetarian', label: 'Vegetarian' },
                { value: 'vegan', label: 'Vegan' },
                { value: 'high_protein', label: 'High protein' },
                { value: 'gluten_free', label: 'Gluten free' },
                { value: 'none', label: 'No specific preference' },
              ]}
            />

            <Field
              label="Daily workout time"
              name="timePerDay"
              type="number"
              icon={Clock3}
              register={register}
              error={errors.timePerDay}
              placeholder="e.g. 30"
              suffix="mins"
              min="1"
              max="300"
            />

            <SelectField
              label="Activity level"
              name="activityLevel"
              icon={Activity}
              register={register}
              error={errors.activityLevel}
              options={[
                { value: 'sedentary', label: 'Sedentary' },
                { value: 'light', label: 'Lightly active' },
                { value: 'moderate', label: 'Moderately active' },
                { value: 'active', label: 'Very active' },
              ]}
            />
          </div>
        </section>

        {/* Helpful note */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#b9f65a]/15 bg-[#b9f65a]/[0.05] p-4">
          <Sparkles size={19} className="mt-0.5 shrink-0 text-[#b9f65a]" />
          <div>
            <p className="text-sm font-semibold text-white">
              Your details make a difference
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Your fitness goal, available time, activity level, and food
              preferences help personalize the plans FitGenie creates.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate('/dashboard/profile')}
            disabled={submitting}
            className="rounded-xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.05] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#b9f65a] px-6 py-3.5 text-sm font-bold text-[#101708] shadow-lg shadow-[#b9f65a]/10 transition hover:-translate-y-0.5 hover:bg-[#c9ff72] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Saving changes...
              </>
            ) : (
              <>
                <Save size={17} />
                Save changes
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
