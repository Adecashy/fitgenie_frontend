import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoutPage from '../../LogoutPage'
import { ChevronRight, History, Icon, LayoutDashboard, Menu, Sparkles, UserRound, WandSparkles, X } from 'lucide-react'

const defaultMenuItems = [
    {
        label: "Overview",
        path: "/dashboard",
        icon: LayoutDashboard,
        end: true
    },
    {
        label: "Profile",
        path: "/dashboard/profile",
        icon: UserRound
    },
    {
        label: "History",
        path: "/dashboard/history",
        icon: History
    },
    {
        label: "Generate Plan",
        path: "/dashboard/generate-plan",
        icon: WandSparkles
    }
]

const DashboardNav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const closeMobileMenu = () => setMobileMenuOpen(false)

    const navLinkClass = ({ isActive }) => `group flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${isActive ? "bg-[#b9f65a]/10 text-[#b9f65a]" : "text-slate-400 hover:bg-white/[0.05] hover:text-white"}`
  return (
     <header className='sticky top-0 z-50 border-b border-white/[0.08] bg-[#080d1b]/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8'>
            <Link to="/dashboard" onClick={closeMobileMenu} className='group flex shrink-0 items-center gap-2.5'>
                <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#b9f65a] text-[#080d1b] transition-transform duration-300 group-hover:rotate-6'>
                    <Sparkles size={21} strokeWidth={2.5} />
                </span>
                <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                    Fit<span className='text-[#b9f65a]'>Genie</span>
                </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
                {defaultMenuItems.map(({ label, path, icon: Icon, end }) => (
                    <NavLink key={path} to={path} end={end} className={navLinkClass} >
                        <Icon size={17} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Desktop user actions */}
            <div className="hidden items-center gap-3 lg:flex hover:text-[#b9f65a]">
                <span className="h-8 w-px bg-white/10" />
                <LogoutPage />
            </div>

            {/* Mobile menu button */}
            <button type='button' onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} className='flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-[#b9f65a]/30 hover:text-[#b9f65a] lg:hidden'>
                {mobileMenuOpen ? <X size={21}/> : <Menu size={21} />}
            </button>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
            <div className="border-t border-white/[0.08] bg-[#0b1020] px-4 py-4 sm:px-6 lg:hidden">
                <nav className="mx-auto flex max-w-[1600px] flex-col gap-1">
                    {defaultMenuItems.map(({ label, path, icon: Icon, end }) => (
                        <NavLink key={path} to={path} end={end} onClick={closeMobileMenu} className={navLinkClass} >
                            <Icon size={18}/>
                            <span className="flex-1">{label}</span>
                            <ChevronRight size={16} className="opacity-50" />
                        </NavLink>
                    ))}
                    <div className="mt-3 border-t border-white/[0.08] pt-3">
                        <LogoutPage />
                    </div>
                </nav>
            </div>
        )}
     </header>
  )
}

export default DashboardNav