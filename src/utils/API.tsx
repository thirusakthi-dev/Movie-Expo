import axios from "axios";

export const API_KEY = "b6cd7d2001b46ce57823157b4f5d7508";
export const BASE_URL = "https://api.themoviedb.org/3";

//Home Feed Lists

export const getPopularMovies = () => {
  return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
};

export const getTopMovies = () => {
  return axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
};

export const getNowPlaying = () => {
  return axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
};

//Search

export const getSearch = (query: string) => {
  return axios.get(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
};

//Single Item Details

export const getMovieData = (id: string) => {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
};

export const getTVShowDetail = (id: string) => {
  return axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
};

//

export const getMovieVideos = (id: string) => {
  return axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
};
export const getTVVideos = (id: string) => {
  return axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
};

//Cast Details

export const getCastMovieDetails = (id: string) => {
  return axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
};

export const getCastTVDetails = (id: string) => {
  return axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
};

//

export const backgroundImage = (id: string) => {
  return axios.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
};

export const todayTrend = () => {
  return axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
};

export const getMovieReviews = (id: string) => {
  return axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
};
export const getTVReviews = (id: string) => {
  return axios.get(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}`);
};

export const getMovieRecommendations = (id: string) => {
  return axios.get(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
};
export const getTVRecommendations = (id: string) => {
  return axios.get(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
};
