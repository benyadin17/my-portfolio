"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Column, Heading, Input, Textarea, Button, Text } from "@once-ui-system/core";

type Blog = {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
};

export default function EditBlogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2]; // ambil id dari url /blog/[id]/edit

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Failed to load blog");
        const data = await res.json();
        setBlog(data);
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setDate(data.date.slice(0, 10)); // format YYYY-MM-DD untuk input date
      } catch {
        setError("Error loading blog post");
      }
    }
    fetchBlog();
  }, [id]);

  async function handleUpdate() {
    if (!title || !summary || !date) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary, content, date }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update post");
      }

      alert("Post updated successfully");
      router.push("/blog"); // kembali ke list blog
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) return <Text color="danger">{error}</Text>;
  if (!blog) return <Text>Loading...</Text>;

  return (
    <Column gap="m" padding="xl" style={{ maxWidth: 600, margin: "auto" }}>
      <Heading>Edit Blog Post</Heading>

      <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading} id={""}      />
      <Input
              label="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={loading} id={""}      />
      <Textarea
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              rows={8} id={""}      />
      <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading} id={""}      />

      <Button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Post"}
      </Button>
    </Column>
  );
}
