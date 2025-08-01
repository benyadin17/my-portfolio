"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Column, Heading, Row, Button } from "@once-ui-system/core";

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  async function fetchPosts() {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  }

  function startEdit(post: BlogPost) {
    router.push(`/blog/${post.id}/edit`);
  }

  return (
    <Column gap="l" padding="xl">
      <Heading variant="display-strong-l">Blog</Heading>

      <Column gap="s" style={{ marginTop: 20 }}>
        {posts.map((post) => (
          <Row
            key={post.id}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "0.5rem 0",
            }}
          >
            <Link href={`/blog/${post.id}`} style={{ fontWeight: 600 }}>
              {post.title}
            </Link>
            <div>
              <Button
                variant="tertiary"
                onClick={() => startEdit(post)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </div>
          </Row>
        ))}
      </Column>
    </Column>
  );
}
