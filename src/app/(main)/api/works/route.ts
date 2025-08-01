import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const works = await prisma.work.findMany();
    return NextResponse.json(works);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const work = await prisma.work.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create work" }, { status: 500 });
  }
}
