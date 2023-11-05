import { z } from "zod";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

const createReservationSchema = z.object({
  listingId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number().min(1),
});

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const validationResult = createReservationSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 409 }
    );
  }

  const { listingId, startDate, endDate, totalPrice } = validationResult.data;

  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          startDate,
          endDate,
          userId: currentUser.id,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json({ message: "Listing reserved." }, { status: 201 });
}
