import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// register user endpoint
export async function POST(req) {
  try {
    const body = await req.json();

    // Validate request body
    if (!body.name || !body.email || !body.password) {
      throw new Error("Name, email, and password are required.");
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        bio: body.bio,
        password: body.password,
        email: body.email,
      },
    });

    return NextResponse.json({ user: newUser.name }, { status: 200 });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002" &&
      error.meta.target.includes("email")
    ) {
      // Email already exists in the database
      return NextResponse.error("Email already exists", { status: 400 });
    } else {
      // Other errors
      console.error("Error registering user:", error);
      return NextResponse.error("Internal Server Error", { status: 500 });
    }
  }
}
