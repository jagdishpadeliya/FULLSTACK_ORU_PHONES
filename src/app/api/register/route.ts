import User from "@/lib/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
export async function POST(req: NextRequest) {
  try {
    const { name, username, password } = await req.json();
    const hashedPassword = await hash(password, 12);
    await User.create({
      id: randomUUID(),
      name,
      email: username,
      password: hashedPassword,
    });
    return NextResponse.json({
      user: {
        name,
        username,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
