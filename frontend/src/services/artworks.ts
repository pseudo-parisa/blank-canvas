import api from './api';

// artwork statuses 
export type ArtworkStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Artwork {
  id: number;
  title: string;
  description: string;
  medium: string | null;
  width: number | null;
  height: number | null;
  imageUrl: string | null;
  status: ArtworkStatus;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

// basic input for creating artwork
export interface ArtworkInput {
  title: string;
  description: string;
  medium?: string;
  width?: number;
  height?: number;
}

// fetch seller's artworks
export async function getMyArtworks(): Promise<Artwork[]> {
  const response = await api.get<Artwork[]>('/artworks/mine');
  return response.data;
}

// create new draft
export async function createArtwork(
  input: ArtworkInput,
): Promise<Artwork> {
  const response = await api.post<Artwork>('/artworks', input);
  return response.data;
}

// update existing artwork
export async function updateArtwork(
  id: number,
  input: ArtworkInput,
): Promise<Artwork> {
  const response = await api.patch<Artwork>(`/artworks/${id}`, input);
  return response.data;
}

// change status 
export async function updateArtworkStatus(
  id: number,
  status: ArtworkStatus,
): Promise<Artwork> {
  const response = await api.patch<Artwork>(
    `/artworks/${id}/status`,
    { status },
  );

  return response.data;
}

// delete artwork
export async function deleteArtwork(id: number): Promise<void> {
  await api.delete(`/artworks/${id}`);
}

// upload artwork image
export async function uploadArtworkImage(
  artworkId: number,
  file: File,
): Promise<Artwork> {
  const formData = new FormData();

  formData.append('file', file);

  const response = await api.post<Artwork>(
    `/artworks/${artworkId}/image`,
    formData,
  );

  return response.data;
}