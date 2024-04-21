import RatingStars from "./RatingStars";

export default function ProfileReviewCard({
  setID,
  rating,
  timeCreated,
  goToReview,
}) {
  return (
    <div
      className="card-clickable"
      onClick={() => {
        goToReview(setID);
      }}
    >
      <h3 className="mb-2">Set: {setID}</h3>
      <RatingStars numStars={rating} />
      <p>On: {timeCreated}</p>
    </div>
  );
}
