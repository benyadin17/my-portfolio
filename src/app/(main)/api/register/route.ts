import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/userstore";

function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body: { name?: string; email?: string; password?: string } = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const newUser = await createUser(name, email, password);
    if (!newUser) {
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    return NextResponse.json({
      message: "User created successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
