import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, description } = await request.json();

    const work = await prisma.work.update({
      where: { id: params.id },
      data: { title, description },
    });

    return NextResponse.json(work);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update work" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.work.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Work deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete work" }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const work = await prisma.work.findUnique({
      where: { id: params.id },
    });

    if (!work) return NextResponse.json({ error: "Work not found" }, { status: 404 });

    return NextResponse.json(work);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch work" }, { status: 500 });
  }
}
