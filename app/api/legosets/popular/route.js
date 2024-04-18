import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(req) {
  const topSets = await prisma.Legoset.findMany(); // fix this later to sort by popularity
  return NextResponse.json(topSets, { status: 200 });
}
