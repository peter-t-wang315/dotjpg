import Image from "next/image";
import SetReviewBlock from "@/components/SetReviewBlock";

const setName = "Jungle Raider";

const setImage = "/images/lego-set1.jpg";

const reviews = [
  {
    username: "Username 1",
    numReviews: 3,
    rating: 5,
    review:
      "The LEGO Jungle Raider set offers a thrilling adventure in a compact package. Designed for explorers and adventurers, this set captures the essence of jungle exploration with its detailed features and rugged design. Design & Build The Jungle Raider features a robust design, perfect for navigating through dense foliage and rough terrain. The vehicle is equipped with large, all-terrain wheels, a sturdy roll cage, and a powerful engine, giving it an authentic jungle expedition look. The build is engaging and straightforward, making it suitable for both young and adult LEGO enthusiasts. Minifigures The set includes two minifigures: a brave explorer and a menacing jungle creature. The explorer is equipped with a backpack and a machete, ready to uncover ancient mysteries. The jungle creature adds a thrilling element to the adventure, with its detailed design and posable features. Playability The Jungle Raider is designed for action-packed play. Its rugged construction allows it to tackle any obstacle, from fallen trees to hidden traps. The vehicle's cockpit is accessible, allowing the minifigures to easily hop in and out during their exploration. The set also includes accessories such as a treasure chest and gems, adding to the excitement of the adventure. Overall Overall, the LEGO Jungle Raider set is a fantastic addition to any LEGO collection. Its detailed design, exciting features, and playability make it a must-have for fans of adventure and exploration. Whether you're embarking on a solo expedition or facing off against jungle creatures with friends, the Jungle Raider promises endless hours of imaginative play.",
  },
  {
    username: "Username 2",
    numReviews: 15209,
    rating: 4,
    review: "This set was ok I suppose",
  },
  {
    username: "Username 3",
    numReviews: 1,
    rating: 1,
    review:
      "Save ur boring unworthy earth attempted time savings. Buy urself train tickets",
  },
];

export default function Index() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center border border-black rounded-lg p-4 mb-2">
        <h1>{setName}</h1>
        <Image src={setImage} width={375} height={375} alt={`Image`} />
        <div className="flex justify-between w-full mt-6">
          <div className="flex flex-col gap-5">
            <p>Piece count</p>
            <p>Rating</p>
          </div>
          <button className="btn-primary self-end">Review Set</button>
        </div>
      </div>
      {reviews?.map((review, index) => (
        <SetReviewBlock
          username={review.username}
          numReviews={review.numReviews}
          rating={review.rating}
          review={review.review}
        />
      ))}
    </div>
  );
}
