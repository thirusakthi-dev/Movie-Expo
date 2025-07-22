import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import DefaultUser from "../../assets/images/dummy-user.png";
import type { Reviews } from "../../utils/Interfaces";

interface MovieReviewProps {
  reviews: Reviews[];
}

const MovieReview = ({ reviews }: MovieReviewProps) => {
  const [expandedReviews, setExpandedReviews] = useState<
    Record<string, boolean>
  >({});

  const toggleReview = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="px-[1rem] sm:px-[3rem] md:px-[5rem] lg:px-[9rem] xl:px-[12rem] bg-light text-dark dark:bg-dark dark:text-light">
      <h1 className="mb-2 text-xl  font-bold">Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews are available</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {reviews.map((review) => {
            const isExpanded = expandedReviews[review.id] || false;

            return (
              <li
                key={review.id}
                className="flex flex-col gap-2 border-slate-300 border-b-[0.1rem] pb-3"
              >
                <figure className="flex flex-row gap-2  ">
                  <img
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`
                        : DefaultUser
                    }
                    className="rounded-full w-[45px] h-[45px] "
                  />

                  <figcaption>
                    <p className="text-md">{review.author_details.username}</p>
                    <p className="text-[0.74rem] text-slate-600">
                      {format(new Date(review.created_at), "MMM d, yyyy")} (
                      {formatDistanceToNow(new Date(review.created_at), {
                        addSuffix: true,
                      })}
                      )
                    </p>
                  </figcaption>
                </figure>
                <article>
                  <p className="font-md text-[0.79rem] md:text-sm ">
                    {isExpanded || review.content.length <= 250
                      ? review.content
                      : review.content.slice(0, 250) + "..."}
                  </p>
                  <button
                    onClick={() => toggleReview(review.id)}
                    className="font-[500] text-sm text-blue-500 whitespace-nowrap cursor-pointer"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default MovieReview;
