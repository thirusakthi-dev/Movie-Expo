import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCastTVDetails,
  getTVRecommendations,
  getTVReviews,
  getTVShowDetail,
  getTVVideos,
} from "../utils/API";
import type { Cast, Crew, Movie, Reviews, Video } from "../utils/Interfaces";
import MovieReview from "./Movie/MovieReview";
import RecommendationsTab from "./MovieTab";

const TVItem = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<Crew | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const TVResponse = await getTVShowDetail(id!);
        setMovie(TVResponse.data);
        //
        const castResponse = await getCastTVDetails(id!);
        setCast(castResponse.data.cast);
        //
        const directorInfo = castResponse.data?.crew?.find(
          (person: Crew) => person.job === "Director" || "Series Director"
        );
        setDirector(directorInfo || null);
        console.log(directorInfo);
        //
        const videoRes = await getTVVideos(id!);
        setVideos(videoRes.data.results);

        //

        const reviewRes = await getTVReviews(id!);
        setReviews(reviewRes.data.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTV();
  }, [id]);

  return (
    <div className="flex flex-col gap-6  bg-light text-dark dark:bg-dark dark:text-light">
      <section
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        }}
        className="bg-cover bg-top bg-no-repeat  "
      >
        <div className="flex flex-col-reverse items-center justify-center gap-4 px-[2rem] sm:px-[3rem] md:px-[4.5rem]  md:flex-row md:gap-14 lg:px-[9rem] xl:px-[12rem] py-[1rem] md:py-[2rem]  lg:gap-50 lg:py-[3rem] backdrop-blur-[3px] bg-[hsla(0,0%,0%,0.600)]">
          <div className=" flex flex-col justify-items-center justify-start items-start">
            <div className=" flex flex-col gap-3 sm:gap-6 md:gap-7  text-light">
              <div className="flex flex-col gap-2  ">
                <p className="font-bold text-lg md:text-2xl xl:text-2xl ">
                  {movie?.name || "Untitled"}
                  <span> ({movie?.first_air_date?.slice(0, 4)})</span>
                </p>
                <p className=" text-sm ">
                  {director?.name ||
                    director?.original_name ||
                    "Director Unknown"}
                </p>
                <ul className="flex gap-1.5 ">
                  {movie?.genres?.map((genre) => (
                    <li
                      key={genre.id}
                      className="
                    p-1 rounded-sm  font-medium text-[0.69rem]"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              <article>
                <p className=" lg:w-xl text-[0.84rem] sm:text-[0.93rem] md:text-[0.92rem] lg:text-[0.94rem] ">
                  {movie?.overview}
                </p>
              </article>
            </div>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie?.title || "Movie poster"}
            className="w-[190px] rounded-xl aspect-[2/3] object-cover sm:w-[190px] md:w-[230px] xl:w-[300px]"
          />
        </div>
      </section>
      <section className="flex flex-col justify-center gap-0.5 px-[1rem] lg:px-[9rem] md:px-[5rem] sm:px-[3rem] xl:px-[12rem]">
        <h1 className="text-xl pb-1.5 font-bold">Full Cast</h1>
        <div className="flex gap-0.7 overflow-x-auto scroll-smooth no-scrollbar lg:gap-4 sm:gap-3 ">
          {cast
            .filter((actor) => actor.profile_path)
            .slice(0, 15)
            .map((actor) => (
              <figure
                className="flex flex-col gap-0.5 items-center text-center"
                key={actor.id}
              >
                <span>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt="Actor"
                    className="rounded-full w-[70px] h-[70px] object-cover
                     sm:w-[90px] sm:h-[90px] "
                  />
                </span>
                <p className="font-normal text-[0.82rem] w-[110px]">
                  {actor.original_name || actor.name || "Uncredited"}
                </p>
                <p className="text-[0.78rem] font-medium text-slate-600 w-[110px]">
                  {actor.character || "Uncredited"}
                </p>
              </figure>
            ))}
        </div>
      </section>
      <section className=" flex flex-col gap-4 px-[1rem] sm:px-[3rem] md:px-[4rem] lg:px-[9rem] xl:px-[12rem]">
        <h1 className="text-xl  font-bold">Videos</h1>
        {videos.length === 0 ? (
          <p>No videos are available</p>
        ) : (
          <ul className="flex flex-row gap-5 overflow-x-auto">
            {videos
              .filter((vid) => vid.site === "YouTube")
              .slice(0, 3)
              .map((video) => (
                <li className="" key={video.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className=" h-[250px] w-[300px] sm:w-[360px] sm:h-[220px] md:w-[400px] md:h-[250px] lg:w-[500px] rounded-lg"
                  ></iframe>
                </li>
              ))}
          </ul>
        )}
      </section>
      <MovieReview reviews={reviews} />
      <section className="">
        <RecommendationsTab
          title="Recommendations"
          fetchFunc={() => getTVRecommendations(id!)}
        />
      </section>
    </div>
  );
};

export default TVItem;
