import { FiLogOut, FiEdit2, FiLink, FiBell, FiShield } from 'react-icons/fi';

export default function ProfileMain() {
    return (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] p-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Pro Member
                </span>
            </div>

            <div className="flex items-center space-x-5 mb-8">
                <div className="relative">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl overflow-hidden flex items-end justify-center">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=1e293b" alt="Alex Thompson" className="w-full h-full" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm text-gray-600 hover:text-blue-600 transition-colors">
                        <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Alex Thompson</h3>
                    <p className="text-sm text-gray-500 font-medium">Product Architect at Digital Flow</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800">user@example.com</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Account Tenure</p>
                    <p className="text-sm font-semibold text-gray-800">Member since: January 1, 2026</p>
                </div>
            </div>

            <div className="bg-[#0047D4] rounded-xl p-5 flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-2.5 rounded-lg text-white">
                        <FiLink className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider mb-0.5">Active Assets</p>
                        <p className="text-2xl font-bold text-white leading-none">12</p>
                    </div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-white/10">
                    VIEW LINKS
                </button>
            </div>

            <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-gray-600">
                        <FiBell className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">Email Notifications</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-gray-600">
                        <FiShield className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-700">Two-Factor Authentication</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                        Disabled
                    </span>
                </div>
            </div>

            <button className="w-full flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl transition-colors text-sm">
                <FiLogOut className="w-4 h-4" />
                <span>Logout Session</span>
            </button>
        </div>
    )
}
