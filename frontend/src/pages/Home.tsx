import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import { artworks } from "@/features/mockArtworks";

function Home() {
    const featured = artworks.filter(
        (artwork) => artwork.featured
    );

    return (
        <div className="bg-[#f7f5fb]">
            <section className="min-h-[80vh] bg-[#e9e0f8] px-6 py-20">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-violet-500">
                            Art, Reimagined
                        </p>

                        <h1 className="serif mt-6 text-6xl leading-[0.95] text-neutral-900 md:text-8xl">
                            Find art
                            <br />
                            worth keeping.
                        </h1>

                        <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-600">
                            Discover original artwork, follow emerging
                            artists, and participate in curated auctions.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/browse"
                                className="inline-flex items-center gap-3 bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
                            >
                                Explore Collection
                                <ArrowRight size={16} />
                            </Link>

                            <Link
                                to="/auctions"
                                className="border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white"
                            >
                                View Auctions
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
                            <img
                                src={featured[0]?.image}
                                alt={featured[0]?.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-xl">
                            <p className="serif text-xl">
                                {featured[0]?.title}
                            </p>

                            <p className="mt-1 text-sm text-neutral-500">
                                {featured[0]?.artist}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-violet-500">
                                Selected Works
                            </p>

                            <h2 className="serif mt-3 text-4xl text-neutral-900 md:text-5xl">
                                Featured artwork
                            </h2>
                        </div>

                        <Link
                            to="/browse"
                            className="hidden text-sm text-neutral-600 hover:text-violet-500 md:block"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featured.map((artwork) => (
                            <ArtworkCard
                                key={artwork.id}
                                artwork={artwork}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;