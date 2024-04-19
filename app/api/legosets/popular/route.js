import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
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
  });
  return NextResponse.json(topSets, { status: 200 }); // TODO: Add avg review as a float for the front end
}
