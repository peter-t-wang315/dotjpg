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
  }); // fix this later to sort by popularity
  return NextResponse.json(matchingSets, { status: 200 });
}
