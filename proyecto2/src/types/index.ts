export interface SimpsonCharacter {
  id: number;
  name: string;
  age?: number;
  birthdate?: string;
  gender: string;
  occupation: string;
  portrait_path: string;
  phrases: string[];
  status: string;
  description?: string;
  first_appearance_ep_id?: number;
  first_appearance_sh_id?: number;
}

export interface SimpsonEpisode {
  id: number;
  name: string;
  airdate: string;
  season: number;
  episode_number: number;
  synopsis?: string;
  image_path?: string;
  description?: string;
}

export interface SimpsonLocation {
  id: number;
  name: string;
  use?: string;
  town?: string;
  image_path?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}
