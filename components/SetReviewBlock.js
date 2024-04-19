export default function SetReviewBlock({
  username,
  numReviews,
  rating,
  review,
}) {
  return (
    <div className="flex w-full border border-border bg-background rounded-lg">
      <div className="flex flex-col bg-background-darker w-1/6 pt-2 pb-3 px-3 rounded-l-md">
        <h4>{username}</h4>
        <p className="mb-4">Reviews: {numReviews}</p>
        <p>Rating: {rating}</p>
      </div>
      <div className="flex w-5/6 p-2">{review}</div>
    </div>
  );
}
