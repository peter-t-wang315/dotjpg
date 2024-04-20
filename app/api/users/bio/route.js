import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// edit user bio endpoint
export async function PUT(req) {
  const body = await req.json();
  const { bio, name } = body;

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  const email = session?.email;

  const updatedUser = await prisma.User.update({
    where: {
      email: email,
    },
    data: {
      bio: bio,
      name: name,
    },
  });
  return NextResponse.json(
    { user: updatedUser.name, bio: updatedUser.bio },
    { status: 200 }
  );
}
