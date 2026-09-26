import type { Auction } from "@/types/auction";

export const auctions: Auction[] = [
    {
        id: 1,
        artworkId: 3,
        title: "Afterlight",
        artist: "Noah Ellis",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=80",
        currentBid: 1250,
        startingBid: 800,
        bids: 14,
        endsAt: "2026-10-15T21:00:00",
    },
    {
        id: 2,
        artworkId: 5,
        title: "Still Becoming",
        artist: "Eli Rowan",
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
        currentBid: 2100,
        startingBid: 1200,
        bids: 27,
        endsAt: "2026-10-20T18:00:00",
    },
];