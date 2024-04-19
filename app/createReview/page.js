import RatingStars from "@/components/RatingStars";
import Image from "next/image";

const setName = "Jungle Raider";

const setImage = "/images/lego-set1.jpg";

const pieceCount = "Piece Count";

const rating = 4;

export default function Index() {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-1/4 border border-black rounded-lg p-5 items-center">
        <h2>{setName}</h2>
        <Image src={setImage} width={375} height={375} alt={`Image`} />
        <div className="flex justify-between w-full mt-7">
          <p>{pieceCount}</p>
          <RatingStars numStars={rating} />
        </div>
      </div>
      <div className="flex flex-col w-3/4 font-medium">
        <h4>What would you rate this set out of 5 stars?</h4>
        <p>User Rating</p>
        <h4 className="mt-5">Please write your review here:</h4>
        <textarea className="textarea-primary h-full" />
        <button className="btn-primary self-end mt-2">Submit</button>
      </div>
    </div>
  );
}
