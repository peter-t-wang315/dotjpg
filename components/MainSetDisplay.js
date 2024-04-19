import Image from "next/image";
import RatingStars from "./RatingStars";

const rating = 4;

export default function MainSetDisplay({
  id,
  image,
  title,
  brick_count,
  year,
  push,
}) {
  let imageLink = "";
  if (image !== undefined) {
    imageLink = `data:image/jpeg;base64,${image}`;
  }

  return (
    <div
      className="col-span-1 w-full flex gap-5 card-clickable flex-row"
      onClick={() => {
        push(`review/${id}`);
      }}
    >
      <Image src={imageLink} width={200} height={200} alt={`${title} Image`} />
      <div className="flex flex-col justify-between">
        <h4 className="font-medium">{title}</h4>
        <div>
          <RatingStars numStars={rating} />
          <p>Brick Count: {brick_count}</p>
          <p>Year: {year}</p>
        </div>
      </div>
    </div>
  );
}
