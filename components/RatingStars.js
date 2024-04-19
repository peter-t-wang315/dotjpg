export default function RatingStars({ numStars }) {
  const star = String.fromCharCode(0x2605);
  const stars = star.repeat(numStars);
  return <p>{stars}</p>;
}
