import { useGetLinksQuery } from "../../feature/api";

function DashboardHeader() {
    const { data, isLoading, error } = useGetLinksQuery();
    const datas = data || [];
    console.log(datas.length);
    if (isLoading) return <div className="text-center py-10">Loading</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error</div>;
    return (
        <>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        My Links
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Manage and track your shortened digital assets.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Total Active
                    </p>
                    <p className="text-4xl font-extrabold text-blue-600 leading-none mt-0.5">
                        {datas.length}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DashboardHeader