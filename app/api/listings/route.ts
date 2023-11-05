import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/utils/db";

const locationSchema = z.object({
  flag: z.string().min(1),
  label: z.string().min(1),
  latlng: z
    .number()
    .array()
    .refine((values) => values.length === 2),
  region: z.string().min(1),
  value: z.string().min(1),
});

const createListingSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  location: locationSchema,
  imageSrc: z.string().url(),
  guestCount: z.number().min(1),
  roomCount: z.number().min(1),
  bathroomCount: z.number().min(1),
  price: z.number().min(1),
});

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();

  const validation = createListingSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: "Missing required paramters for creating the listing." },
      { status: 409 }
    );
  }

  const {
    title,
    description,
    category,
    location,
    imageSrc,
    roomCount,
    guestCount,
    bathroomCount,
    price,
  } = validation.data;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      catgeory: category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      price,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(
    { message: "Listing created!", listingId: listing.id },
    { status: 201 }
  );
}
