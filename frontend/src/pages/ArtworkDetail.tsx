import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

import { artworks } from "@/features/mockArtworks";

function ArtworkDetail() {
    const { id } = useParams();

    const artwork = artworks.find(
        (item) => item.id === Number(id)
    );

    if (!artwork) {
        return (
            <section className="min-h-screen bg-[#f7f5fb] px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <h1 className="serif text-4xl">
                        Artwork not found
                    </h1>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f7f5fb] px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/browse"
                    className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-violet-500"
                >
                    <ArrowLeft size={16} />
                    Back to collection
                </Link>

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="bg-neutral-100">
                        <img
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="w-fit bg-violet-200 px-3 py-1 text-xs font-medium text-violet-900">
                            {artwork.status}
                        </span>

                        <h1 className="serif mt-6 text-6xl text-neutral-900">
                            {artwork.title}
                        </h1>

                        <p className="mt-3 text-lg text-neutral-500">
                            by {artwork.artist}
                        </p>

                        <div className="my-8 h-px bg-neutral-300" />

                        <dl className="grid grid-cols-2 gap-6 text-sm">
                            <div>
                                <dt className="text-neutral-400">
                                    Medium
                                </dt>
                                <dd className="mt-1 text-neutral-900">
                                    {artwork.medium}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-neutral-400">
                                    Year
                                </dt>
                                <dd className="mt-1 text-neutral-900">
                                    {artwork.year}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-10">
                            <p className="text-sm text-neutral-500">
                                Current price
                            </p>

                            <p className="mt-2 text-4xl font-medium">
                                ${artwork.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 bg-neutral-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-violet-600">
                                {artwork.status === "AUCTION"
                                    ? "View Auction"
                                    : "Purchase Artwork"}
                            </button>

                            <button className="border border-neutral-300 bg-white px-5 transition hover:border-violet-400">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArtworkDetail;