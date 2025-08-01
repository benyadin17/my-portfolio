"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Column, Text, Input, Button } from "@once-ui-system/core";
import Lottie from "lottie-react";
import animation404 from "./hello.json";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return <Text size="m">Loading...</Text>;
  }

  async function handleAddWork() {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.message || "Failed to add work"}`);
      } else {
        alert("Work added successfully!");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      alert("Failed to add work");
    }
    setLoading(false);
  }

  return (
    <Column
      gap="s"
      style={{ marginTop: "3rem", alignItems: "center", textAlign: "center" }}
    >
      <Text as="h1" size="xl">
        Dashboard
      </Text>

      <Text size="m">
        Welcome, {session?.user?.name} ({session?.user?.email})
      </Text>

      <Column gap="m" style={{ maxWidth: 400, width: "100%", marginTop: 20 }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          id="title"
          disabled={loading}
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          id="description"
          disabled={loading}
        />
        <Button onClick={handleAddWork} disabled={loading}>
          {loading ? "Adding..." : "Add Work"}
        </Button>
      </Column>

      <Lottie animationData={animation404} style={{ width: 200, height: 200 }} />
    </Column>
  );
}
