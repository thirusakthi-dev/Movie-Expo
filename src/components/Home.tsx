import Header from "./Header";
import {
  getTopMovies,
  getPopularMovies,
  getNowPlaying,
  todayTrend,
} from "../utils/API";
import TopRated from "./MovieTab";
import PopularMovies from "./MovieTab";
import OnRunning from "./MovieTab";
import DayTrending from "./MovieTab";

const Home = () => {
  return (
    <>
      <main className=" bg-light text-dark  dark:bg-dark dark:text-light transition duration-700 ease-in-out">
        <DayTrending title="Trending" fetchFunc={todayTrend} />
        <PopularMovies title="What's Popular" fetchFunc={getPopularMovies} />
        <TopRated title="Top Rated" fetchFunc={getTopMovies} />
        <OnRunning title="On Screening" fetchFunc={getNowPlaying} />
      </main>
    </>
  );
};

export default Home;
