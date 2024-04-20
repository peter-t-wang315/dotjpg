import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// gets reviews for a provided lego set id
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  const legoSetID = Number(param);

  const matchingReviews = await prisma.Review.findMany({
    where: {
      legosetID: legoSetID,
    },
  });

  return NextResponse.json(matchingReviews, { status: 200 });
}

// endpoint for making a new review
export async function POST(req) {
  const { review, stars, userID, legosetID } = await req.json(); // TODO: Remove userID, get that from the session

  const newReview = await prisma.Review.create({
    data: {
      review: review,
      stars: stars,
      userID: userID,
      legosetID: legosetID,
    },
  });

  return NextResponse.json(newReview, { status: 200 });
}
