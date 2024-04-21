import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// gets reviews for a provided lego set id
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  const legoSetID = Number(param);

  const matchingReviews = await prisma.Review.findMany({
    where: {
      legosetID: legoSetID,
    },
    include: {
      user: {
        select: {
          name: true,
          Review: true,
        },
      },
    },
  });

  const result = matchingReviews.map((x) => {
    x.reviewer = x.user.name;
    x.Review = undefined;
    x.userReviewCount = x.user.Review.length;
    x.user = undefined;
    return x;
  });

  // const averageStars =
  //   result.reduce((acc, x) => acc + x.stars, 0) / result.length;

  // return NextResponse.json([...result, averageStars], { status: 200 });
  return NextResponse.json(result, { status: 200 });
}

// endpoint for making a new review
export async function POST(req) {
  const { review, stars, userID, legosetID } = await req.json(); // TODO: Remove userID, get that from the session
  try {
    const newReview = await prisma.Review.create({
      data: {
        review: review,
        stars: stars,
        userID: userID,
        legosetID: legosetID,
      },
    });

    return NextResponse.json(newReview, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(`User already created review for this set`, {
          status: 409,
          statusText: `User already created review for this set`,
        });
      }
      return NextResponse.json(
        `${error.code} prisma error occured during create`,
        { status: 500 }
      );
    }
    return NextResponse.json(error, { status: 500 });
  }
}

// Deletes review. Soft deletion would be better, although its more complex and doesn't offer benefit for our use case
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const userIDParam = searchParams.get("userID");
  const legoSetIDParam = searchParams.get("legosetID");
  const userID = Number(userIDParam);
  const legoSetID = Number(legoSetIDParam);

  const deletedReview = await prisma.Review.delete({
    where: {
      reviewID: {
        userID: userID,
        legosetID: legoSetID,
      },
    },
  });

  return NextResponse.json({ deletedReview }, { status: 200 });
}
