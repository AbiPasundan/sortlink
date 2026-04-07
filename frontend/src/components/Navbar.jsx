import { Link } from "react-router";

export default function Navbar() {
    const token = localStorage.getItem("token") || null;
    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="mx-auto px-10 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-black text-[20px] tracking-tight text-[#0F172A]">ShortLink</span>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                        <Link to="/dashboard" className="text-blue-600 border-b-2 border-blue-600 pb-0.5">Dashboard</Link>
                        <Link to="/analytics" className="hover:text-slate-800 transition-colors">Analytics</Link>
                        <Link to="/links" className="hover:text-slate-800 transition-colors">Links</Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {token ? (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/logout" className="text-sm font-semibold bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md transition-colors">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}