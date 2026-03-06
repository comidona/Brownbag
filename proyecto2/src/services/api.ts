import type { SimpsonCharacter, SimpsonEpisode, SimpsonLocation, ApiResponse } from '../types';

const BASE_URL = 'https://thesimpsonsapi.com/api';
const CDN_BASE = 'https://cdn.thesimpsonsapi.com';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export function getImageUrl(path: string, size: 200 | 500 | 1280 = 500): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${CDN_BASE}/${size}${path}`;
}

export const api = {
  getCharacters: (page = 1) => fetchData<ApiResponse<SimpsonCharacter>>(`/characters?page=${page}`),
  getCharacter: (id: number) => fetchData<SimpsonCharacter>(`/characters/${id}`),
  getEpisodes: (page = 1) => fetchData<ApiResponse<SimpsonEpisode>>(`/episodes?page=${page}`),
  getLocations: (page = 1) => fetchData<ApiResponse<SimpsonLocation>>(`/locations?page=${page}`),
};
