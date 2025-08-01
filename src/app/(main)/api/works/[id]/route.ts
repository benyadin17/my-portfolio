import { NextRequest, NextResponse } from "next/server";

let works = [
  { id: "1", title: "Work 1", description: "Desc 1" },
  { id: "2", title: "Work 2", description: "Desc 2" },
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const work = works.find(w => w.id === params.id);
  if (!work) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(work);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, description } = await request.json();
  const index = works.findIndex(w => w.id === params.id);
  if (index === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });

  works[index] = { ...works[index], title, description };
  return NextResponse.json(works[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  works = works.filter(w => w.id !== params.id);
  return NextResponse.json({ message: "Deleted" });
}
