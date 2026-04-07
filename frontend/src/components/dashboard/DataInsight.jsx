import { BsCheckCircle } from "react-icons/bs";
import DataInsightImg from "#/assets/img/datainsight.png";

function FeatureItem({ text }) {
    return (
        <li className="flex items-center gap-3">
            <BsCheckCircle color="blue" />
            <span className="text-gray-800 font-semibold">{text}</span>
        </li>
    );
};

export default function DataInsight() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-16 md:px-12">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

                <div className="w-full md:w-1/2">
                    <img src={DataInsightImg} alt="Dashboard statistik pada laptop" className="w-full h-auto rounded-2xl shadow-md object-cover" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">

                    <span className="text-sm font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
                        Data Driven Insights
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        Observe your link architecture in real-time.
                    </h2>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Every click is a data point. Our dashboard provides surgical precision into
                        where your traffic originates, who is engaging, and how your team
                        communications are performing across the globe.
                    </p>

                    <ul className="space-y-4">
                        <FeatureItem text="Geographic Distribution Maps" />
                        <FeatureItem text="Device & Browser Breakdown" />
                        <FeatureItem text="UTM Parameter Tracking" />
                    </ul>

                </div>
            </div>
        </section>
    );
};