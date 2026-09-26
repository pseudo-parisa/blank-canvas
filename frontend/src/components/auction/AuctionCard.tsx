import { Link } from "react-router-dom";
import type { Auction } from "@/types/auction";

interface AuctionCardProps {
    auction: Auction;
}

function AuctionCard({ auction }: AuctionCardProps) {
    return (
        <Link
            to={`/auctions/${auction.id}`}
            className="group block bg-white"
        >
            <div className="aspect-[4/5] overflow-hidden">
                <img
                    src={auction.image}
                    alt={auction.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-violet-500">
                    Live Auction
                </p>

                <h3 className="serif mt-2 text-2xl">
                    {auction.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                    {auction.artist}
                </p>

                <div className="mt-6 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-neutral-400">
                            Current bid
                        </p>

                        <p className="mt-1 text-xl font-medium">
                            ${auction.currentBid.toLocaleString()}
                        </p>
                    </div>

                    <span className="text-sm text-neutral-500">
                        {auction.bids} bids
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default AuctionCard;