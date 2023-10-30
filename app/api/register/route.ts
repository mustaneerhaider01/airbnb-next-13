import { z } from "zod";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().trim(),
  password: z.string().min(6).trim(),
});

export async function POST(req: Request) {
  const body = await req.json();

  const validationResult = registerSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 422 }
    );
  }

  const { email, name, password } = validationResult.data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(
    { message: "Your account has been created" },
    { status: 201 }
  );
}
