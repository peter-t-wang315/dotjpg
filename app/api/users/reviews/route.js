import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// edit user bio endpoint
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("userID");
  const userID = Number(param);
  const reviews = await prisma.Review.findMany({
    where: {
      userID: userID,
    },
  });
  return NextResponse.json(reviews,  { status: 200 });
}
