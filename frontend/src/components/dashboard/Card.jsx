import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

function CardItem({ icon, iconBg, title, desc, accent }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
                {icon}
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
            <div className={`h-1 w-8 rounded-full ${accent}`} />
        </div>
    );
}
function Card() {
    return (
        <section className="bg-slate-100 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-2">Architectural Features</p>
                <h2 className="text-3xl font-black text-slate-900 mb-10">Built for Enterprise Precision</h2>
                <div className="grid md:grid-cols-3 gap-5">
                    <CardItem icon={<AiOutlineThunderbolt size="22" />} iconBg="bg-blue-100 text-blue-600" title="Easy Create" desc="Instantly generate high-performance short links..." accent="bg-blue-400" />
                    <CardItem icon={<MdEditNote size="22" />} iconBg="bg-blue-100 text-blue-600" title="Custom Slugs" desc="Maintain brand authority..." accent="bg-blue-400" />
                    <CardItem icon={<HiUserGroup size="22" />} iconBg="bg-orange-100 text-orange-500" title="Team Ready" desc="Collaborate across departments..." accent="bg-orange-400" />
                </div>
            </div>
        </section>
    )
}

export default Card