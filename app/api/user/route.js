import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();
  const userInfo = await prisma.user.findUnique({
    where: {
      id: body.id,
    },
  });
  const reviewInfo = await prisma.review.findMany({
    where: {
      userID: body.id,
    },
  });

  const output = { ...userInfo, reviews: [...reviewInfo] };

  return NextResponse.json(output, { status: 200 });
}
