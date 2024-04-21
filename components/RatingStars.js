export default function RatingStars({ numStars }) {
  const star = String.fromCharCode(0x2605);
  const emptyStar = String.fromCharCode(0x2606);
  const filledStars = star.repeat(numStars);
  const emptyStarsCount = 5 - numStars;
  const emptyStars = emptyStar.repeat(emptyStarsCount);
  const allStars = filledStars + emptyStars;
  return <p>{allStars}</p>;
}
