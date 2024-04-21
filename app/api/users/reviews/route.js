import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// edit user bio endpoint
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("userID");
  const userID = Number(param);
  const reviews = await prisma.Review.findMany({
    take: 6,
    where: {
      userID: userID,
    },
  });

  const user = await prisma.User.findUnique({
    where: {
      id: userID,
    },

  });

  return NextResponse.json(
   {
    user: user.name,
    bio: user.bio,
    isAdmin: user.isAdmin,
    reviews: reviews.map(x => {x.userID = undefined; return x; })
  },  { status: 200 });
}
