export interface Auction {
    id: number;
    artworkId: number;
    title: string;
    artist: string;
    image: string;
    currentBid: number;
    startingBid: number;
    bids: number;
    endsAt: string;
}