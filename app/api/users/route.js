import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

// register user endpoint
export async function POST(req) {
  const body = await req.json();

  const newUser = await prisma.User.create({
    data: {
      name: body.name,
      bio: body.bio,
      password: body.password,
      email: body.email
    },
  });
  // TODO: Redirect  req.session.user = newUser;

  return NextResponse.json({user: newUser.name}, {status: 200});
}
