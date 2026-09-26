export type ArtworkStatus =
    | "AVAILABLE"
    | "AUCTION"
    | "SOLD";

export interface Artwork {
    id: number;
    title: string;
    artist: string;
    image: string;
    medium: string;
    year: number;
    price: number;
    status: ArtworkStatus;
    featured?: boolean;
}