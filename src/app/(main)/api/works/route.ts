import { NextRequest, NextResponse } from "next/server";

let works = [
  // contoh awal
  { id: "1", title: "Work 1", description: "Desc 1" },
  { id: "2", title: "Work 2", description: "Desc 2" },
];

export async function GET() {
  return NextResponse.json(works);
}

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  if (!title || !description) return NextResponse.json({ message: "Missing data" }, { status: 400 });

  const newWork = { id: Date.now().toString(), title, description };
  works.push(newWork);

  return NextResponse.json(newWork, { status: 201 });
}
