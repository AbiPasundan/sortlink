import { FiTrash2 } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiLink } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetLinksQuery } from "#/feature/api";

function DashboardMain() {
    const { data, isLoading, error } = useGetLinksQuery();
    const datas = data || [];

    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(null);

    const filtered = datas.filter(
        (l) =>
            l.slug.toLowerCase().includes(search.toLowerCase()) ||
            l.original_url.toLowerCase().includes(search.toLowerCase())
    );

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(text).catch(() => { });
        setCopied(id);
        setTimeout(() => setCopied(null), 1500);
    };

    if (isLoading) return <div className="text-center py-10">Loading</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error</div>;
    return (
        <>
            <div className="flex items-center gap-2 mb-6">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                    <input
                        type="text"
                        placeholder="Search by name or URL..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                </div>
                <button className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-blue-600 hover:border-blue-300 shadow-sm transition">
                    <FiFilter className="text-base" />
                </button>
            </div>

            <div className="space-y-3">
                {datas.length === 0 && (
                    <div className="text-center py-16 text-gray-400 text-sm">
                        No links found.
                    </div>
                )}
                {filtered.map((link) => (
                    <div key={link.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between group hover:shadow-md hover:border-blue-100 transition-all duration-200" >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <FiLink />
                                <span className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer truncate">
                                    {link.slug}
                                </span>
                            </div>
                            <p className="text-gray-400 text-xs truncate mb-2">
                                {link.original_url}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                    <FiCalendar className="text-[11px]" />
                                    {link.created_at}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FiTrendingUp className="text-[11px]" />
                                    1 CLICKS
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 ml-4 shrink-0">
                            <button onClick={() => handleCopy(link.id, link.slug)} className={`p-2 rounded-lg border transition-all duration-150 ${copied === link.id ? "border-green-300 bg-green-50 text-green-500" : "border-gray-100 bg-gray-50 text-gray-400 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50" }`} title="Copy link" >
                                <FiCopy className="text-sm" />
                            </button>
                            <button className="p-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all duration-150" title="Delete link" >
                                <FiTrash2 className="text-sm" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DashboardMain