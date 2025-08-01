"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Column,
  Row,
  Text,
  Input,
  Button,
  Card,
  Heading,
} from "@once-ui-system/core";
import Lottie from "lottie-react";
import animation404 from "./hello.json";

type Menu = "works" | "blogs";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [activeMenu, setActiveMenu] = useState<Menu>("works");

  // States Works
  const [workTitle, setWorkTitle] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [loadingWorks, setLoadingWorks] = useState(false);

  // States Blogs
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [loadingBlog, setLoadingBlog] = useState(false);

  // State untuk kontrol animasi loading
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Setelah 3 detik hilangkan animasi
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return <Text size="m">Loading...</Text>;
  }

  if (showAnimation) {
    // Fullscreen animasi Lottie sekali pas awal buka
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Lottie animationData={animation404} style={{ width: 250, height: 250 }} />
      </div>
    );
  }

  async function handleAddWork() {
    if (!workTitle || !workDescription) {
      alert("Please fill all fields for Work");
      return;
    }
    setLoadingWorks(true);
    try {
      const res = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: workTitle, description: workDescription }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.error || "Failed to add work"}`);
      } else {
        alert("Work added successfully!");
        setWorkTitle("");
        setWorkDescription("");
      }
    } catch {
      alert("Failed to add work");
    }
    setLoadingWorks(false);
  }

  async function handleAddBlog() {
    if (!blogTitle || !blogSummary || !blogDate) {
      alert("Please fill all fields for Blog");
      return;
    }
    setLoadingBlog(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: blogTitle, summary: blogSummary, date: blogDate }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.error || "Failed to add blog post"}`);
      } else {
        alert("Blog post added successfully!");
        setBlogTitle("");
        setBlogSummary("");
        setBlogDate("");
      }
    } catch {
      alert("Failed to add blog post");
    }
    setLoadingBlog(false);
  }

  return (
    <Row style={{ minHeight: "100vh" }}>
      {/* Sidebar kiri */}
      <Column
        style={{
          width: 220,
          backgroundColor: "#1f2937",
          color: "white",
          padding: "1.5rem 1rem",
        }}
        gap="m"
      >
        <Text size="m" style={{ fontWeight: "600", marginBottom: "2rem" }}>
          {session?.user?.name || "User"}
        </Text>

        <Button
          variant={activeMenu === "works" ? "primary" : "secondary"}
          style={{ justifyContent: "flex-start" }}
          onClick={() => setActiveMenu("works")}
        >
          Works
        </Button>

        <Button
          variant={activeMenu === "blogs" ? "primary" : "secondary"}
          style={{ justifyContent: "flex-start" }}
          onClick={() => setActiveMenu("blogs")}
        >
          Blogs
        </Button>
      </Column>

      {/* Content kanan */}
      <Column
        gap="m"
        style={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f9fafb",
        }}
      >
        <Heading size="xl" style={{ marginBottom: "1rem" }}>
          {activeMenu === "works" ? "Add New Work" : "Add New Blog Post"}
        </Heading>

        {activeMenu === "works" && (
          <Card
            style={{
              padding: "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: 8,
              maxWidth: 600,
            }}
          >
            <Column gap="m">
              <Input
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                placeholder="Work Title"
                disabled={loadingWorks}
                id="workTitle"
              />
              <Input
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                placeholder="Work Description"
                disabled={loadingWorks}
                id="workDescription"
              />
              <Button onClick={handleAddWork} disabled={loadingWorks}>
                {loadingWorks ? "Adding..." : "Add Work"}
              </Button>
            </Column>
          </Card>
        )}

        {activeMenu === "blogs" && (
          <Card
            style={{
              padding: "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: 8,
              maxWidth: 600,
            }}
          >
            <Column gap="m">
              <Input
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Blog Title"
                disabled={loadingBlog}
                id="blogTitle"
              />
              <Input
                value={blogSummary}
                onChange={(e) => setBlogSummary(e.target.value)}
                placeholder="Blog Summary"
                disabled={loadingBlog}
                id="blogSummary"
              />
              <Input
                type="date"
                value={blogDate}
                onChange={(e) => setBlogDate(e.target.value)}
                disabled={loadingBlog}
                id="blogDate"
              />
              <Button onClick={handleAddBlog} disabled={loadingBlog}>
                {loadingBlog ? "Adding..." : "Add Blog Post"}
              </Button>
            </Column>
          </Card>
        )}
      </Column>
    </Row>
  );
}
