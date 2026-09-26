import { useParams } from "react-router-dom";
import { auctions } from "@/features/mockAuctions";

function AuctionDetail() {
    const { id } = useParams();

    const auction = auctions.find(
        (item) => item.id === Number(id)
    );

    if (!auction) {
        return (
            <section className="min-h-screen bg-[#f7f5fb] px-4 py-16 sm:px-6 sm:py-24">
                <h1 className="serif text-4xl">
                    Auction not found
                </h1>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#f7f5fb] px-4 py-10 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-7xl">

                <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">

                    {/* Artwork */}
                    <div className="bg-neutral-100">
                        <img
                            src={auction.image}
                            alt={auction.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    {/* Auction Information */}
                    <div className="flex flex-col justify-center">

                        <p className="text-sm uppercase tracking-[0.25em] text-violet-500">
                            Live Auction
                        </p>

                        <h1 className="serif mt-6 text-6xl text-neutral-900">
                            {auction.title}
                        </h1>

                        <p className="mt-3 text-lg text-neutral-500 ">
                            {auction.artist}
                        </p>

                        {/* Bid Box */}
                        <div className="mt-8 bg-white p-5 sm:mt-10 sm:p-6">

                            <p className="text-sm text-neutral-500">
                                Current bid
                            </p>

                            <p className="mt-2 text-3xl font-medium sm:text-4xl">
                                ${auction.currentBid.toLocaleString()}
                            </p>

                            <p className="mt-2 text-sm text-neutral-400">
                                {auction.bids} bids
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                                <input
                                    type="number"
                                    placeholder="Your bid"
                                    className="min-w-0 flex-1 border border-neutral-300 px-4 py-3 outline-none focus:border-violet-400"
                                />

                                <button
                                    type="button"
                                    className="bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
                                >
                                    Place Bid
                                </button>

                            </div>
                        </div>

                        <p className="mt-6 text-sm text-neutral-500">
                            Auction ends{" "}
                            {new Date(
                                auction.endsAt
                            ).toLocaleString()}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default AuctionDetail;