function About() {
    return (
        <section className="min-h-screen bg-[#e9e0f8] px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-500">
                    About Blank Canvas
                </p>

                <h1 className="serif mt-6 text-6xl leading-tight text-neutral-900 md:text-8xl">
                    Art should feel
                    <br />
                    personal.
                </h1>

                <div className="mt-12 grid gap-10 text-neutral-600 md:grid-cols-2">
                    <p className="text-lg leading-relaxed">
                        Blank Canvas is a digital marketplace designed
                        to connect artists and collectors through
                        discovery, ownership, and live auctions.
                    </p>

                    <p className="text-lg leading-relaxed">
                        The platform gives independent artists a space
                        to present their work while giving collectors
                        new ways to discover and participate in the
                        art market.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;