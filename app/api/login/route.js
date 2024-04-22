import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  // Find user by email
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return new NextResponse("Invalid Username or Password", { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(body.password, user.password);

  // Check if password matches
  if (!passwordMatch) {
    console.log(body.password);
    console.log(user.password);
    return new NextResponse("Invalid Username or Password", { status: 401 });
  }
  const sessionData = { email: user.email, id: user.id };

  const cookie = serialize("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  return new NextResponse(JSON.stringify(sessionData), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
