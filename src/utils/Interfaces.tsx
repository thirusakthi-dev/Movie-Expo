export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  poster_path: string | null;
  genres?: Genre[];
  backdrop_path: string;
  vote_average: number;
  media_type: string;
}

export interface Video {
  id: number;
  type: string;
  site: string;
  key: string;
}

export interface Cast {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string;
}

export interface Crew {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string;
}

export interface AuthorDetails {
  avatar_path: string | null;
  name: string | null;
  rating: number | null;
  username: string;
}

export interface Reviews {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}
