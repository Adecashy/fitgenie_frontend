import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const footerGroups = [
    {
        title: "Explore",
        links: [
            { label: "Discover", path: "/discover" },
            { label: "Programmes", path: "/programmes"},
            { label: "Blog", path: "/blog"}
        ]
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", path: "/help" },
            { label: "Contact", path: "/contact" }
        ]
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Service", path: "/terms"},
            { label: "Privacy Policy", path: "/privacy"}
        ]
    }
]

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b1020] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-14 sm:px-8 lg:px-12">
            {/* Main footer content */}
            <div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_2fr]'>
                {/* Brand section */}
                <div className='max-w-sm'>
                    <Link to="/" className="group mb-5 inline-flex items-center gap-3" >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b9f65a] text-[#0b1020] transition-transform duration-300 group-hover:rotate-6">
                            <Sparkles size={23} strokeWidth={2.5} />
                        </span>
                        <span className="text-2xl font-extrabold tracking-tight">
                            Fit<span className="text-[#b9f65a]">Genie</span>
                        </span>
                    </Link>
                    <p className="mb-6 text-sm leading-7 text-slate-400">Your goals. Your plan. Your pace. Build healthier habits with personalized AI-powered fitness and meal plans designed around your lifestyle.</p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#b9f65a]/20 bg-[#b9f65a]/5 px-3 py-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b9f65a] opacity-50" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b9f65a]" />
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.16em] text-[#b9f65a]">SYSTEM OPERATIONAL</span>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    {footerGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-5 text-sm font-bold text-white">{group.title}</h3>
                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link>
                                            {link.label}
                                            <ArrowRight size={13} size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate-500">© {new Date().getFullYear()} FitGenie. All rights reserved.</p>
                <p className="flex items-center gap-1.5 text-slate-500">
                    Made with
                    <Heart size={14} className="fill-[#b9f65a] text-[#b9f65a]" />
                    for your healthier future.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer