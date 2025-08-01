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

  // Handler for adding a work
  const handleAddWork = async () => {
    setLoadingWorks(true);
    try {
      // Simulate API call or add your logic here
      // Reset fields after "adding"
      setWorkTitle("");
      setWorkDescription("");
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoadingWorks(false);
    }
  };

  // Handler for adding a blog post
  const handleAddBlog = async () => {
    setLoadingBlog(true);
    try {
      // Simulate API call or add your logic here
      // Reset fields after "adding"
      setBlogTitle("");
      setBlogSummary("");
      setBlogDate("");
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoadingBlog(false);
    }
  };

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
          backgroundColor: "#fff",
        }}
      >
        <Lottie animationData={animation404} style={{ width: 250, height: 250 }} />
      </div>
    );
  }

  return (
    <Row style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Sidebar kiri */}
      <Column
        style={{
          width: 220,
          padding: "1.5rem 1rem",
          backgroundColor: "#fff", // Sama dengan konten kanan
          borderRight: "1px solid #e5e7eb", // optional border tipis biar ada pemisah halus
          color: "#111827", // teks lebih gelap untuk kontras
          fontWeight: "600",
          gap: "1rem",
        }}
      >
        <Text size="m" style={{ marginBottom: "1.5rem" }}>
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
          backgroundColor: "#fff", // Sama dengan sidebar
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
