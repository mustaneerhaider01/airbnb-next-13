import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  req: Request,
  { params: { listingId } }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json(
      { message: "Invalid listing id" },
      { status: 409 }
    );
  }

  await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ message: "Property deleted." }, { status: 200 });
}
