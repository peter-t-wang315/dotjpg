import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    const user = await prisma.User.findUnique({
      where: {
        name: name,
      },
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}

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
        isAdmin: body.isAdmin,
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

// Deletes user and all of their reviews. Soft deletion would be better, although its more complex and doesn't offer benefit for our use case
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  const userID = Number(param);

  const deletedReviews = await prisma.Review.deleteMany({
    where: {
      userID: userID,
    },
  });

  const deletedUser = await prisma.user.delete({
    where: {
      id: userID,
    },
  });

  return NextResponse.json({ deletedUser }, { status: 200 });
}
