import ProfileReviewCard from "@/components/ProfileReviewCard";
import Image from "next/image";

const profilePic = "/images/profilePic.png";
const firstName = "John";
const lastName = "Yates";
const userName = "User1";
const biography =
  "As a passionate LEGO enthusiast, I thrive on the boundless creativity that comes with building brick by brick. From constructing intricate cityscapes to crafting fantastical worlds, my love for LEGO transcends mere hobbyism—it's a lifestyle. Whether meticulously following instructions or daring to forge my own designs, each set I assemble becomes a canvas for imagination. My dedication to the LEGO community extends beyond my personal creations; I revel in sharing tips, techniques, and marveling at the ingenuity of fellow builders. With every new release, I eagerly anticipate the next challenge and opportunity to immerse myself in the colorful, interlocking universe of LEGO.";
const reviews = [
  { setID: 10271, rating: 4, timeCreated: "2/12/2024" },
  { setID: 10255, rating: 2, timeCreated: "2/28/2024" },
  { setID: 9032, rating: 1, timeCreated: "3/15/2024" },
  { setID: 15, rating: 1, timeCreated: "1/30/2024" },
  { setID: 25032, rating: 2, timeCreated: "11/01/2023" },
  { setID: 52039, rating: 5, timeCreated: "12/25/2023" },
];

export default function Index() {
  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col w-1/6 items-center">
        <Image src={profilePic} width={200} height={200} alt={`Image`} />
        <h1>
          {firstName} {lastName}
        </h1>
        <p className="mb-3">{userName}</p>
        <button className="btn-primary">Edit Profile</button>
      </div>
      <div className="flex flex-col w-5/6">
        <h2>Bio</h2>
        <p>{biography}</p>
        <h2 className="mt-10">Most Recent Reviews</h2>
        <div className="grid grid-cols-3 gap-5">
          {reviews?.map((review, index) => (
            <ProfileReviewCard
              setID={review.setID}
              rating={review.rating}
              timeCreated={review.timeCreated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
