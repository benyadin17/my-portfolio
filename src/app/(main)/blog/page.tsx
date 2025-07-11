"use client";

import Link from "next/link";
import { Column, Heading, Text, Row, Badge } from "@once-ui-system/core";

const blogPosts = [
  {
    id: "1",
    title: "Proses Desain Redesign Website XYZ: Studi Kasus Lengkap",
    summary: "Pelajari bagaimana saya melakukan redesign website mulai dari riset sampai hasil akhir.",
    date: "2025-07-01",
  },
  {
    id: "2",
    title: "5 Tren Warna dan Tipografi untuk Desain Web Tahun 2025",
    summary: "Insight tren terbaru yang bisa kamu aplikasikan di project desainmu.",
    date: "2025-06-15",
  },
  {
    id: "3",
    title: "Cara Membuat User Persona yang Efektif untuk Project UX",
    summary: "Panduan langkah demi langkah membuat user persona agar desainmu tepat sasaran.",
    date: "2025-06-05",
  },
];

export default function BlogPage() {
  return (
    <Column gap="l" padding="xl" style={{ minHeight: "80vh" }}>
      <Heading variant="display-strong-l" marginBottom="l">
        Blog
      </Heading>

      {blogPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
          <Row
            as="a"
            gap="m"
            style={{
              padding: "1rem",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: "1rem",
              cursor: "pointer",
              transition: "background-color 0.15s",
              color: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <Column gap="xs" style={{ flex: 1 }}>
              <Heading variant="heading-default-l">{post.title}</Heading>
              <Text variant="body-default-s" onBackground="neutral-medium">
                {post.summary}
              </Text>
            </Column>

            <Badge
              style={{
                alignSelf: "flex-start",
                padding: "0.25rem 0.5rem",
                fontWeight: "500",
              }}
            >
              {new Date(post.date).toLocaleDateString()}
            </Badge>
          </Row>
        </Link>
      ))}
    </Column>
  );
}
