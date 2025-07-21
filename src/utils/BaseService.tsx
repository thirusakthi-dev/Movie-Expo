import axios from "axios";

const baseUrl: string = import.meta.env.VITE_TMDB_API_URL;

const API = () => {
  axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default API;
