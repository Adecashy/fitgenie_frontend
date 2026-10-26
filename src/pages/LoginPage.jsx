import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft, ArrowRight, Dumbbell, Eye, EyeOff, Icon, LockKeyhole, Mail, Salad, Sparkles, Target } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from "yup"
import { userContext } from '../contexts/UserContext'

const loginSchema = yup.object({
    email: yup.string().trim().required("kindly enter a valid email"),
    password: yup.string().required("password is required")
})

const LoginPage = () => {
    const navigate = useNavigate()
    const { getUserProfile } = useContext(userContext)
    const [submitting, setSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (inputValue) => {
        const API_URL = "https://fitgenie-backend-2izk.onrender.com/api"
        
        setSubmitting(true)
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                body: JSON.stringify(inputValue),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await res.json()

            if (!res.ok || result.success !== true) {
                toast.error(result.message || 'Unable to log in. Please try again.')
                return
            }
            if (!result.token) {
                toast.error('Login succeeded, but no authentication token was returned.')
                return
            }
            
            localStorage.setItem("token", JSON.stringify(result.token))
            toast.success(result.message || 'Login successful!')
            await getUserProfile()
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error('Unable to connect to the server. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

     const inputClass = (field) =>
    `w-full rounded-xl border bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:bg-white/[0.07] focus:ring-2 ${
      errors[field]
        ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/10'
        : 'border-white/10 focus:border-[#b9f65a]/60 focus:ring-[#b9f65a]/10'
    }`
    
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d1b] px-4 py-8 text-white sm:px-6 lg:py-12">
        {/* Background decoration  */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#b9f65a]/10 blur-[110px]" />
        <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/90 shadow-2xl shadow-black/30 lg:grid-cols-2">
            {/* Left promotional panel  */}
            <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#131d32] via-[#11182b] to-[#17132d] p-10 lg:flex xl:p-14">
                    <div className="pointer-events-none absolute -right-20 top-32 h-64 w-64 rounded-full bg-[#b9f65a]/10 blur-3xl" />
                    <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
                    <Link to="/" className="group relative inline-flex w-fit items-center gap-3">
                        <span className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#b9f65a] text-[#0b1020] transition-transform duration-300 group-hover:rotate-6'>
                            <Sparkles size={23} strokeWidth={2.5} />
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight">
                            Fit<span className='text-[#b9f65a]'>Genie</span>
                        </span>
                    </Link>
                    <div className="relative my-14">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b9f65a]/20 bg-[#b9f65a]/5 px-3 py-2 text-xs font-semibold text-[#b9f65a]">
                            <Sparkles size={14} />
                            WELCOME BACK
                        </span>
                        <h1 className="max-w-lg text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">
                            Your journey
                            <br />
                            Your progress
                            <br />
                            <span className="text-[#b9f65a]">Your next level.</span>
                        </h1>
                        <p className="mt-6 max-w-md text-base leading-7 text-slate-400">Pick up from where left off. Your personalized fitness and nutrition journey is waiting for you</p>
                        <div className="mt-10 space-y-4">
                            {[
                                {
                                    icon: Target,
                                    title: "Stay focus on your goals",
                                    text: "Keep moving toward the results you want."
                                },
                                {
                                    icon: Dumbbell,
                                    title: "Keep your routine going",
                                    text: "Make every workout count."
                                },
                                {
                                    icon: Salad,
                                    title: "Make better food choices",
                                    text: "Keep your nutrition plans within reach."
                                }
                            ].map(({ icon: Icon, title, text }) => (
                                <div key={title} className="flex items-center gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#b9f65a]">
                                        <Icon size={20} />
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">{title}</h3>
                                        <p className="mt-1 text-sm text-slate-400">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="relative text-xs text-slate-500">Your goals. Your plan. Your pace</p>
            </section>

            {/* Login form panel */}
            <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
                <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#b9f65a] lg:mb-10">
                    <ArrowLeft size={16}/>
                    Back to home
                </Link>

                {/* Mobile logo */}
                <Link to="/" className="mb-8 flex w-fit items-center gap-2 lg:hidden">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b9f65a] text-[#0b1020]">
                        <Sparkles size={20} />
                    </span>
                    <span className="text-xl font-extrabold">
                        Fit<span className="text-[#b9f65a]">Genie</span>
                    </span>
                </Link>
                <div className='mb-8'>
                    <span className="text-xs font-bold tracking-[0.2em] text-[#b9f65a]">WELCOME BACK</span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Sign in to FitGenie</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">Enter your details to continue your fitness journey.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-5'>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email address</label>
                        <div className='relative'>
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input type="email" id='email' autoComplete='email' placeholder="johndoe@dev.com" {...register("email")} aria-invalid={Boolean(errors.email)} className={inputClass("email")} />
                        </div>
                        {errors.email && (<p className="mt-2 text-xs text-red-400">{errors.email.message}</p>)}
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                        <div className='relative'>
                            <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" {...register("password")} aria-invalid={Boolean(errors.password)} className={`${inputClass("password")} pr-12`} />
                            <button type='button' onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-[#b9f65a]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>
                        {errors.password && (<p className="mt-2 text-xs text-red-400">{errors.password.message}</p>)}
                    </div>
                    <button type='submit' disabled={submitting} className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b9f65a] px-5 py-4 text-sm font-extrabold text-[#0b1020] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9ff7a] hover:shadow-lg hover:shadow-[#b9f65a]/15 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">{submitting ? "Signing you in" : "Login to your account"} {!submitting && (<ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />)}</button>
                    <p>
                        Don't have an account? {" "}
                        <Link to="/signup" className="font-semibold text-[#b9f65a] transition-colors hover:text-[#d1ff91]">Sign up</Link>
                    </p>
                </form>
                <p className="mt-8 text-center text-xs leading-5 text-slate-500">Welcome back to healthier future</p>
            </section>
        </div>
    </main>
  )
}

export default LoginPage