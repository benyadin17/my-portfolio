import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, summary, content, date } = await request.json();

    if (!title || !summary || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await prisma.blog.create({
      data: {
        title,
        summary,
        content: content || "",
        date: new Date(date),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
