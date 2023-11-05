import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  req: Request,
  { params: { reservationId } }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.json(
      { message: "Invalid reservation id" },
      { status: 409 }
    );
  }

  await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(
    { message: "Reservation cancelled" },
    { status: 200 }
  );
}
