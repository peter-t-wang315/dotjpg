import RatingStars from "./RatingStars";

export default function SetReviewBlock({
  username,
  reviewCount,
  rating,
  review,
  createdAt
}) {
  return (
    <div className="card-primary flex-row w-full p-0">
      <div className="flex flex-col bg-background-darker w-1/6 pt-2 pb-3 px-3 rounded-l-md">
        <h4>{username}</h4>
        <p>{reviewCount} Reviews</p>
        <p>{createdAt}</p>
        <RatingStars numStars={rating} />
      </div>
      <div className="flex w-5/6 p-2">{review}</div>
    </div>
  );
}
