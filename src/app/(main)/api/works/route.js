// app/api/works/route.ts
import { NextResponse } from "next/server";
import { works } from "@/lib/data";

// GET /api/works -> list all works
export async function GET() {
  return NextResponse.json(works);
}

// POST /api/works -> add new work
export async function POST(request) {
  const body = await request.json();
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const newWork = {
    id: (works.length + 1).toString(),
    title: body.title,
    description: body.description,
  };
  works.push(newWork);
  return NextResponse.json(newWork, { status: 201 });
}
