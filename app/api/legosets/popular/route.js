import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req) {
  try {
    const topSets = await prisma.Legoset.findMany({
      take: 6,
      where: {
        // Order by the count of reviews with stars over 3 in descending order
        Review: {
          some: {
            stars: {
              gt: 3,
            },
          },
        },
      },
      include: {
        Review: {
          select: {
            stars: true,
          }
        },
        Image: {
          select: {
            image: true,
          },
        },
      },
    });
    // This is suuuuuper hackey but idk what other options exist
    const results = topSets.map((x) => {
      x.averageReviewStars = x.Review.reduce((acc, x) => acc + x.stars, 0) / x.Review.length;
      x.Review = undefined;
      x.image = x.Image?.image.toString("utf8") ?? "";
      x.Image = undefined;
      return x;
    });

    return NextResponse.json(results, { status: 200 }); 
  } catch(error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(`${error.code} prisma error occured during get`, {status: 500});
    }
    return NextResponse.json(error, { status: 500 });
  }
}
