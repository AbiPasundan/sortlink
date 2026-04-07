export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="max-w-3xl mx-auto px-4 py-10">
                {children}
            </main>
        </div>
    )
}
