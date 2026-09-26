import ArtworkCard from "@/components/artwork/ArtworkCard";
import { artworks } from "@/features/mockArtworks";

function Browse() {
    return (
        <section className="min-h-screen bg-[#f7f5fb] px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.25em] text-violet-500">
                            The Collection
                        </p>

                        <h1 className="serif mt-3 text-5xl text-neutral-900 md:text-6xl">
                            Browse Art
                        </h1>

                        <p className="mt-4 max-w-xl text-neutral-500">
                            Discover original works from emerging and
                            established artists.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button className="border border-neutral-300 bg-white px-4 py-2 text-sm">
                            All
                        </button>

                        <button className="border border-neutral-300 bg-white px-4 py-2 text-sm">
                            Paintings
                        </button>

                        <button className="border border-neutral-300 bg-white px-4 py-2 text-sm">
                            Digital
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {artworks.map((artwork) => (
                        <ArtworkCard
                            key={artwork.id}
                            artwork={artwork}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Browse;