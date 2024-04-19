import RatingStars from "./RatingStars";

export default function ProfileReviewCard({ setID, rating, timeCreated }) {
  return (
    <div className="card-clickable">
      <h3 className="mb-2">Set: {setID}</h3>
      <RatingStars numStars={rating} />
      <p>On: {timeCreated}</p>
    </div>
  );
}
