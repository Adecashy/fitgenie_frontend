import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react'

const defaultMenuItems = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Programmes",
        path: "/"
    },
    {
        label: "Help",
        path: "/"
    },
    {
        label: "Discover",
        path: "/"
    }
]

const Navbar = ({ menuItems = defaultMenuItems }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const gotoSignup = () => {
        setMobileMenuOpen(false)
        navigate("/signup")
    }

    const gotoLogin = () => {
        setMobileMenuOpen(false)
        navigate("/login")
    }

    const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1020]/90 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="group flex shrink-0 items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b9f65a] text-[#0b1020] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                    <Sparkles size={22} strokeWidth={2.5} />
                </span>
                <span className="text-2xl font-extrabold tracking-tight">
                    Fit<span className="text-[#b9f65a]">Genie</span>
                </span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden items-center gap-8 md:flex">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return(
                        <Link key={item.path} to={item.path} className={`relative py-2 text-sm font-medium transition-colors duration-200 ${isActive ? "text-[#b9f65a]" : "text-slate-300 hover:text-[#b9f65a]"}`}>
                            {item.label}
                            <span className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#b9f65a] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                        </Link>
                    )
                })}
            </div>

            {/* Desktop authentication buttons */}
            <div className="hidden items-center gap-3 md:flex">
                <button onClick={gotoLogin} className='rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 hover:text-[#b9f65a]'>Login</button>
                <button type='button' onClick={gotoSignup} className="group flex items-center gap-2 rounded-full bg-[#b9f65a] px-5 py-2.5 text-sm font-bold text-[#0b1020] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9ff7a] hover:shadow-lg hover:shadow-[#b9f65a]/20">
                    Get Started
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
            </div>

            {/* Mobile menu toggle */}
            <button type='button' onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden">
                {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`overflow-hidden border-t border-white/10 bg-[#0b1020] transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'max-h-[440px] opacity-100' : 'max-h-0 border-t-transparent opacity-0'}`}>
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link key={item.path} to={item.path} onClick={closeMobileMenu} className={`ounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-[#b9f65a]/10 text-[#b9f65a]' : 'text-slate-300 hover:bg-white/5 hover:text-[#b9f65a]'}`}>{item.label}</Link>
                    )
                })}
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                    <button onClick={gotoLogin} className="rounded-full border border-white/15 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/5">Login</button>
                    <button onClick={gotoSignup} className="rounded-full bg-[#b9f65a] px-4 py-3 text-sm font-bold text-[#0b1020] transition-colors hover:bg-[#c9ff7a]">Sign Up</button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar