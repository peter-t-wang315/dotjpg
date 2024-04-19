import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(req) {
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
      Image: {
        select: {
          image: true
        }
      }
    }
  }); 

    // This is suuuuuper hackey but idk what other options exist
  const results = matchingSets.map(x => {
    x.image = x.Image?.image.toString("utf8") ?? "";
    x.Image = undefined;
    return x;
  });

  return NextResponse.json(results, { status: 200 });
}
