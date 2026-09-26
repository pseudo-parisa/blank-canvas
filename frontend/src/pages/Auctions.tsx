import AuctionCard from "@/components/auction/AuctionCard";
import { auctions } from "@/features/mockAuctions";

function Auctions() {
    return (
        <section className="min-h-screen bg-[#f7f5fb] px-6 py-16">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.25em] text-violet-500">
                        The Auction Room
                    </p>

                    <h1 className="serif mt-4 text-6xl text-neutral-900">
                        Bid on something extraordinary.
                    </h1>

                    <p className="mt-6 text-neutral-500">
                        Explore live auctions and place bids on
                        original works from independent artists.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    {auctions.map((auction) => (
                        <AuctionCard
                            key={auction.id}
                            auction={auction}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Auctions;