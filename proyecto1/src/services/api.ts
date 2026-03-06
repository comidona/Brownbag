const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export const api = {
  getCharacters: (page = 1, filters?: Record<string, string>) => {
    const params = new URLSearchParams({ page: String(page), ...filters });
    return fetchData<import('../types').ApiResponse<import('../types').Character>>(`/character?${params}`);
  },
  getCharacter: (id: number) => fetchData<import('../types').Character>(`/character/${id}`),
  getEpisodes: (page = 1) => fetchData<import('../types').ApiResponse<import('../types').Episode>>(`/episode?${page > 0 ? `page=${page}` : ''}`),
  getEpisode: (id: number) => fetchData<import('../types').Episode>(`/episode/${id}`),
  getLocations: (page = 1) => fetchData<import('../types').ApiResponse<import('../types').Location>>(`/location?${page > 0 ? `page=${page}` : ''}`),
  getLocation: (id: number) => fetchData<import('../types').Location>(`/location/${id}`),
  getMultipleEpisodes: (ids: number[]) => fetchData<import('../types').Episode[]>(`/episode/${ids.join(',')}`),
};
