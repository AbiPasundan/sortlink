import { BsLink } from "react-icons/bs";
import { RiBarChartLine, RiLinkM, RiApps2Line, RiArrowLeftLine, RiBugLine, RiWifiOffLine } from "react-icons/ri";
import { Link } from "react-router";

function QuickLink(props) {
  return (
    <div className="flex mx-5 w-full">
      <div className="bg-white/80 backdrop-blur-sm border border-white hover:border-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all rounded-2xl p-5 cursor-pointer group">
        <div className="w-9 h-9 bg-blue-50 group-hover:bg-blue-100 transition-colors rounded-lg flex items-center justify-center mb-3">
          {props.icon}
        </div>
        <p className="text-slate-800 text-sm font-semibold mb-1">{props.titile}</p>
        <p className="text-slate-400 text-xs leading-relaxed">
          {props.desc}
        </p>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-between px-6 py-10 font-sans">

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">

        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-200 flex items-center justify-center border border-white">
            <BsLink className="text-slate-400 text-4xl" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 rotate-3">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight mb-3"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-2px" }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 text-center text-sm leading-relaxed max-w-sm mb-8">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
        </p>

        <div className="flex gap-3 mb-14">
          <Link to="/dashboard" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-200">
            <RiArrowLeftLine className="text-base" />
            Go to Dashboard
          </Link>
          <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm">
            <RiBugLine className="text-base" />
            Report an Issue
          </button>
        </div>

        <div className="w-full flex items-center justify-center bg-slate-50 p-6">
          <QuickLink icon={<RiBarChartLine className="text-blue-600 text-xl" />} titile="Check Analytics" desc="Track your active links and traffic sources in real-time." />
          <QuickLink icon={<RiLinkM className="text-blue-600 text-xl" />} titile="New ShortLink" desc="Create a brand new architected URL in seconds." />
          <QuickLink icon={<RiApps2Line className="text-blue-600 text-xl" />} titile="Developer API" desc="Integrate our link infrastructure into your apps." />
        </div>
      </div>
    </div>
  );
}
