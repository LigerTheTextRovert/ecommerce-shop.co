import { useState } from "react";
import { reviews } from "../../servies/users-reviews";
import UserReview from "../ui/UserReview";

import { LeftArrow } from "../icons/LeftArrow";
import { RightArrow } from "../icons/RightArrow";

export default function ReviewsSection() {
  const length = reviews.length;
  const [curr, setCurr] = useState(0);

  const prev = () => (curr === 0 ? setCurr(length - 1) : setCurr(curr - 1));
  const next = () => (curr === length - 1 ? setCurr(0) : setCurr(curr + 1));

  return (
    <>
      <h1 className="relative text-primary text-center text-5xl font-bold mt-30 mb-10">
        Cusomer Reviews
        <span className="w-[10px] h-[4px] absolute bottom-0 left-0 bg-muted"></span>
      </h1>
      <div className="flex items-center justify-center gap-4 mb-30">
        <button
          onClick={prev}
          className="cursor-pointer bg-muted/80 p-3 rounded-full shadow hover:bg-muted transition"
        >
          <LeftArrow className="w-6 h-6 text-primary" />
        </button>

        <div className="w-xl overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <div key={i} className="shrink-0 w-full">
                <UserReview
                  username={review.username}
                  image={review.image}
                  caption={review.caption}
                  date={review.date}
                  rating={review.rating}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={next}
          className="cursor-pointer bg-muted/80 p-3 rounded-full shadow hover:bg-muted transition"
        >
          <RightArrow className="w-6 h-6 text-primary" />
        </button>
      </div>
    </>
  );
}
