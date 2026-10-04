function Footer() {
    return (
        <footer className="border-b border-[#e9e2e9] bg-[#f7f4f0]/95 px-6 py-12 text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="font-serif text-lg tracking-tight text-[#342c38]">Blank Canvas</p>
                    <p className="mt-2 text-sm text-neutral-400">
                        A digital space for discovering and collecting art.
                    </p>
                </div>

                <p className="text-sm text-neutral-500">
                    © 2026 Blank Canvas
                </p>
            </div>
        </footer>
    );
}

export default Footer;