import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("id");
  const legoSetId = Number(param);

  const set = await prisma.Legoset.findUnique({
    where: {
      id: legoSetId,
    },
    include: {
      Image: { select: { image: true } },
    },
  });

  return NextResponse.json(
    {
      ...set,
      image: set?.Image.image.toString("utf8") ?? "",
      Image: undefined,
    },
    { status: 200 }
  );
}
