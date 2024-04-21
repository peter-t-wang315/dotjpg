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
  return NextResponse.json(userInfo, { status: 200 });
}
