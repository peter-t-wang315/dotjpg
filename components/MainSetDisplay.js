import Image from "next/image";
import RatingStars from "./RatingStars";

const rating = 4;

export default function MainSetDisplay({ image, title }) {
  return (
    <div
      className="col-span-1 w-full flex gap-5 card-clickable flex-row"
      onClick={() => {
        console.log("This is doing something");
      }}
    >
      <Image src={image} width={200} height={200} alt={`${title} Image`} />
      <div className="flex flex-col justify-between">
        <h4 className="font-medium">{title}</h4>
        <div>
          <RatingStars numStars={rating} />
          <p>Cost: ?</p>
          <p>Brick Count: ?</p>
        </div>
      </div>
    </div>
  );
}
