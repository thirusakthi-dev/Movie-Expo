import React, { useEffect, useState } from "react";
import SiteLogoLight from "../assets/images/site-logo-light.png";
import SiteLogoDark from "../assets/images/site-logo-dark.png";
import DarkIcon from "../assets/images/dark.png";
import LightIcon from "../assets/images/light.png";
import EmptyPoster from "../assets/images/placeholder-poster.jpg";
import { getSearch } from "../utils/API";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

interface ISearch {
  id: number;
  title: string;
  name: string;
  release_date: string;
  first_air_date: string;
  poster_path: string | null;
  media_type: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [theme, toggleTheme] = useDarkMode();
  const [searchItem, setSearchItem] = useState<string>("");

  const [results, setResults] = useState<ISearch[]>([]);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const searchResponse = await getSearch(searchItem!);
        const filtered = searchResponse.data.results.filter(
          (item: any) => item.media_type === "movie" || item.media_type === "tv"
        );
        setResults(filtered);
        console.log(filtered);
      } catch (err) {}
    };
    fetchSearch();
  }, [searchItem]);

  return (
    <header className="flex flex-col border-b-2 bg-light border-b-[#4949491a] gap-5 py-[1.5rem] px-[1rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] xl:px-[10rem] md:flex-row dark:text-light-text dark:bg-dark transition duration-700 ease-in-out">
      <div className="flex justify-between items-center w-full">
        <section className="flex items-center gap-6">
          <a href="/" className="flex flex-row items-center gap-4 active">
            <img
              src={theme === "dark" ? SiteLogoLight : SiteLogoDark}
              alt="Logo"
              className="w-7 h-7 mt-[-7px] "
            />
            <h2 className="text-xl">Movie Expo</h2>
          </a>
          {/* <nav className="hidden text-[0.89rem] md:flex flex-row gap-2 mt-[1px] ">
            <button>Movie</button>
            <button>TV Series</button>
          </nav> */}
        </section>
        <section className="relative">
          <div className="flex flex-row items-center gap-4 ">
            <input
              type="text"
              className="border-slate-300 border rounded-lg p-1"
              placeholder="Search movie or TV show"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button onClick={toggleTheme}>
              <img
                style={{ width: 19, height: 19 }}
                src={theme === "dark" ? LightIcon : DarkIcon}
                alt="Theme"
              />
            </button>
            {searchItem && (
              <ul className="absolute top-[100%] mt-1 left-1 z-10 bg-white shadow-lg rounded w-[19rem] flex flex-col gap-1 max-h-[300px] overflow-y-scroll dark:bg-dark">
                {results.map((item) => (
                  <li
                    className="flex flex-row justify-between p-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600"
                    onClick={() => {
                      navigate(`/${item.media_type}/detail/${item.id}`);
                      setSearchItem("");
                      setResults([]);
                    }}
                  >
                    <figure className="flex gap-1">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                            : EmptyPoster
                        }
                        alt="Poster Loading..."
                        className="w-[48px]  object-cover rounded-lg"
                      />
                      <figcaption>
                        <p className="font-medium text-sm font-[Inter-M]">
                          {item.title || item.name}
                        </p>
                        <p className="text-xs">
                          {(
                            item.release_date ||
                            item.first_air_date ||
                            ""
                          ).slice(0, 4)}
                        </p>
                      </figcaption>
                    </figure>
                    <div>
                      <p
                        className={` rounded-lg text-[0.72rem] text-center w-[3.5rem] ${
                          item.media_type === "tv"
                            ? "bg-[#2563ea]"
                            : "bg-[#7b3aec]"
                        } `}
                      >
                        {item.media_type === "tv" ? "TV" : "Movie"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <div className="md:hidden flex flex-row gap-2">
        <div>
          <button>Movie</button>
        </div>
        <div>
          <button>TV Series</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
