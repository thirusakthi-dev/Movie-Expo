import React, { useEffect, useRef, useState } from "react";
import { type AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import type { Movie } from "../utils/Interfaces";
import LeftArrow from "../assets/images/left-arrow.png";
import RightArrow from "../assets/images/right-arrow.png";
import LeftArrowDark from "../assets/images/left-arrow-dark.png";
import RightArrowDark from "../assets/images/right-arrow-dark.png";
import useDarkMode from "../hooks/useDarkMode";

interface MovieTabProps {
  title: string;
  fetchFunc: (id?: string) => Promise<AxiosResponse<any>>;
  id?: string;
}

const MovieTab: React.FC<MovieTabProps> = ({ title, fetchFunc, id }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theme] = useDarkMode();
  const scrollRef = useRef<HTMLUListElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - 300 : scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchFunc(id);
        const data = response?.data?.results || [];

        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [fetchFunc, id]);

  return (
    <>
      <div className="px-[1rem] sm:px-[3rem] md:px-[4rem] lg:px-[9rem] xl:px-[12rem] relative">
        <h1 className=" mt-5 mb-2 text-lg  font-bold   ">{title}</h1>
        <button
          onClick={() => handleScroll("right")}
          className="absolute bottom-40 right-30 z-10 md:right-3 lg:right-15 md:bottom-37 lg:bottom-43 xl:right-43 hidden lg:block"
        >
          <img
            src={theme === "dark" ? RightArrow : RightArrowDark}
            className="w-9.5 md:w-9 lg:w-10"
          />
        </button>
        <button
          onClick={() => handleScroll("left")}
          className="absolute bottom-40 left-30 z-10 md:left-3 lg:left-15 md:bottom-37 lg:bottom-43 xl:left-43 hidden lg:block "
        >
          <img
            src={theme === "dark" ? LeftArrow : LeftArrowDark}
            className="w-9.5 md:w-9 lg:w-10"
          />
        </button>
        <ul
          ref={scrollRef}
          className="list-none relative flex overflow-x-auto scrollbar-hidden"
        >
          {movies.map((movie: Movie) => (
            <Link
              to={`/${movie.name ? "tv" : "movie"}/detail/${movie.id}`}
              key={movie?.id}
            >
              <li className=" p-2 flex flex-col gap-2 w-36 sm:w-42 md:w-47 lg:w-52">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}
    `}
                  alt="Loading"
                  className=" h-[200px] md:h-[250px] lg:h-[270px] rounded-xl object-cover object-center"
                />
                <section className="flex flex-col gap-1">
                  <p className="text-sm truncate max-w-[200px]">
                    {movie.title ||
                      movie.name ||
                      movie.original_name ||
                      "Untitled"}
                  </p>
                  <div className="text-xs text-gray-500 flex flex-row justify-between pr-1">
                    <p>
                      {movie.release_date?.slice(0, 4) ||
                        movie.first_air_date?.slice(0, 4) ||
                        "Unknown"}
                    </p>
                    <p>{movie.vote_average.toFixed(1)}⭐</p>
                  </div>
                </section>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieTab;
