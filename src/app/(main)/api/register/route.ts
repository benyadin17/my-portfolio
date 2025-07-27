import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/userstore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newUser = await createUser(name, email, password);

    if (!newUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    return NextResponse.json({ message: "User created", user: { id: newUser.id, email: newUser.email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
