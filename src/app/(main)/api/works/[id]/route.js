// app/api/works/[id]/route.ts
import { NextResponse } from "next/server";
import { works } from "@/lib/data";

/**
 * @typedef {Object} Work
 * @property {string} id
 * @property {string} title
 * @property {string} description
 */


// GET /api/works/:id -> get detail work
export async function GET(request, { params }) {
  const work = works.find((w) => w.id === params.id);
  if (!work) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(work);
}

// PUT /api/works/:id -> update work
export async function PUT(request, { params }) {
  const index = works.findIndex((w) => w.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const body = await request.json();
  works[index] = { ...works[index], ...body };
  return NextResponse.json(works[index]);
}

// DELETE /api/works/:id -> delete work
export async function DELETE(request, { params }) {
  const index = works.findIndex((w) => w.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const deleted = works.splice(index, 1);
  return NextResponse.json(deleted[0]);
}
