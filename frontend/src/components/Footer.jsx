export default function Footer(){
    return(
        <footer className="py-5 px-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#64748B] uppercase tracking-wider font-inter font-semibold">
            <span className="text-[16px]">© 2024 ShortLink. The Digital Architect.</span>
            <div className="flex gap-6">
                    <a href="#" className="hover:text-[#000000] transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-[#000000] transition-colors">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-[#000000] transition-colors">
                        API Documentation
                    </a>
                    <a href="#" className="hover:text-[#000000] transition-colors">
                        Support
                    </a>
            </div>
        </footer>
    )
}