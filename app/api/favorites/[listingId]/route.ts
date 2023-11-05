import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

interface IParams {
  params: {
    listingId: string;
  };
}

export async function POST(_: Request, { params: { listingId } }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json(
      { message: "Invalid listing id provided" },
      { status: 409 }
    );
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(
    { message: "Listing added to favorites." },
    { status: 200 }
  );
}

export async function DELETE(_: Request, { params: { listingId } }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json(
      { message: "Invalid listing id provided" },
      { status: 409 }
    );
  }

  const favoriteIds = (currentUser.favoriteIds || [])?.filter(
    (id) => id !== listingId
  );

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(
    { message: "Listing removed from favorites." },
    { status: 200 }
  );
}
