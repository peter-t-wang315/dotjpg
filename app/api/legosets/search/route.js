import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("name");
    const matchingSets = await prisma.Legoset.findMany({
      take: 15,
      where: {
        name: {
          contains: param, // This search is case insensitive, we need to modify the schema to change that
        },
      },
      include: {
        Review: {
            select: {
              stars: true,
            }
        }
      },
      include: {
        Image: {
          select: {
            image: true
          }
        }
      }
    }); 

      // This is suuuuuper hackey but idk what other options exist
    const results = matchingSets.map(x => {
      x.averageReviewStars = 0;
      if(x.Review?.length ?? 0 > 0) {
        x.averageReviewStars = x.Review?.reduce((acc, x) => acc + x.stars, 0) / x.Review.length ?? 0;
      }
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
