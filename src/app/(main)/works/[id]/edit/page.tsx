"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useParams } from "next/navigation"; // kalau pakai next/navigation versi baru
import { Column, Input, Button, Text } from "@once-ui-system/core";

type Work = {
  id: string;
  title: string;
  description: string;
};

export default function EditWorkPage() {
  const router = useRouter();
  const params = useParams();
  const workId = params.id;

  const [work, setWork] = useState<Work | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWork() {
      try {
        const res = await fetch(`/api/works/${workId}`);
        if (!res.ok) throw new Error("Failed to fetch work");
        const data = await res.json();
        setWork(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        setError("Could not load work data");
      } finally {
        setLoading(false);
      }
    }

    if (workId) fetchWork();
  }, [workId]);

  async function handleUpdate() {
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`/api/works/${workId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Update failed");

      // redirect setelah update berhasil
      router.push("/works/1");
    } catch (err) {
      alert("Failed to update work");
    }
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="danger">{error}</Text>;
  if (!work) return <Text>Work not found</Text>;

  return (
    <Column gap="m" padding="xl" style={{ maxWidth: 400 }}>
      <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} id={""}      />
      <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} id={""}      />
      <Button onClick={handleUpdate}>Save Changes</Button>
    </Column>
  );
}
