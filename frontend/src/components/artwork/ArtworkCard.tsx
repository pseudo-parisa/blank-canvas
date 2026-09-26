import { Link } from "react-router-dom";
import type { Artwork } from "@/types/artwork";

interface ArtworkCardProps {
    artwork: Artwork;
}

function ArtworkCard({ artwork }: ArtworkCardProps) {
    return (
        <Link
            to={`/artworks/${artwork.id}`}
            className="group block"
        >
            <div className="overflow-hidden bg-neutral-100">
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 bg-violet-200 px-3 py-1 text-xs font-medium text-violet-900">
                        {artwork.status}
                    </span>
                </div>
            </div>

            <div className="bg-white px-4 py-4">
                <h3 className="font-serif text-xl text-neutral-900">
                    {artwork.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                    {artwork.artist}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                        {artwork.medium}
                    </span>

                    <span className="font-medium text-neutral-900">
                        ${artwork.price.toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ArtworkCard;