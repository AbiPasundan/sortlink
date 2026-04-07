import { useState } from "react";
import { CgLink } from "react-icons/cg";
import { useNavigate } from "react-router";

function HeroButton() {
    return (
        <div className="flex justify-center gap-3 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm">
                Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Learn More
            </button>
        </div>
    )
}
function HeroInput() {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-3 flex gap-2 max-w-lg mx-auto">
            <div className="flex items-center gap-2 flex-1 px-2">
                <span className="text-slate-400 shrink-0"> <CgLink /> </span>
                <input type="text" placeholder="https://very-long-architectural-url.com/asset-id-99238-x1" className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent min-w-0" />
            </div>
            <button onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shrink-0" >
                Shorten
            </button>
        </div>
    )
}

function Hero() {
    return (
        <section className="pt-20 pb-16 px-6 text-center bg-[radial-gradient(45%_45%_at_50%_50%,rgba(0,74,198,0.05)_0%,rgba(0,74,198,0)_100%)]">
            <div className="mx-auto">
                <h1 className="text-[60px] md:text-6xl font-black tracking-tight text-[#191C1D] leading-none mb-4">
                    <span>Shorten URLs.</span>
                    <span className="text-[#2563EB]">Share Easily.</span>
                </h1>
                <p className="text-[#434655] text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                    Create short, memorable links for your team communications. Transform long, cumbersome URLs into powerful digital assets that drive engagement.
                </p>
                <HeroButton />

                <HeroInput />
            </div>
        </section>
    )
}

export default Hero