import { Link, useNavigate } from "react-router";
import { useMeQuery, useLogoutMutation, api } from "#/feature/api.js";
import { useDispatch } from "react-redux";

export default function Navbar() {
    const { data, isLoading } = useMeQuery();
    const datas = data || {};
    const user = datas?.Results?.user;

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = user;

    const handleLogout = async () => {
        await logout();
        dispatch(api.util.resetApiState());
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="mx-auto px-10 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <span className="font-black text-[20px] tracking-tight text-[#0F172A]">
                        ShortLink
                    </span>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                        <Link to="/dashboard" className="text-blue-600 border-b-2 border-blue-600 pb-0.5">
                            Dashboard
                        </Link>
                        <Link to="/analytics" className="hover:text-slate-800 transition-colors">
                            Analytics
                        </Link>
                        <Link to="/dashboard" className="hover:text-slate-800 transition-colors">
                            Links
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isLoading ? (
                        <span className="text-sm text-slate-400">Loading...</span>
                    ) : isLoggedIn ? (
                        <>
                            <Link to="/createlink" className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors" >
                                + Create New Link
                            </Link>

                            <Link to="/profile" className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
                                <img src="https://i.pravatar.cc/" alt="profile" className="w-full h-full object-cover" />
                            </Link>

                            <button onClick={handleLogout} className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors" >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors" >
                                Login
                            </Link>
                            <Link to="/register" className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors" >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}