import ProfileMain from '#/components/profile/ProfileMain';
import Navbar from '#/components/Navbar';
import Footer from '#/components/Footer';

export default function Profile() {
    return (
        <>
            <Navbar />
            <main className="grow flex flex-col items-center py-12 px-4">
                <div className="w-full max-w-160">
                    <h2 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-3 ml-1">
                        Account Management
                    </h2>

                    <ProfileMain />

                    <p className="text-center mt-6 text-xs text-gray-400 font-medium">
                        Your data is encrypted using AES-256 standards. <a href="#" className="text-[#0047D4] hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
};
