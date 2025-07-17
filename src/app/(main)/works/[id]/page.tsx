"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Column, Heading, Text, Input, Button, Row } from "@once-ui-system/core";

type Work = {
  id: string;
  title: string;
  description: string;
};

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  async function fetchWorks() {
    const res = await fetch("/api/works");
    const data = await res.json();
    setWorks(data);
  }

  useEffect(() => {
    fetchWorks();
  }, []);

  async function handleAdd() {
    if (!title || !description) return alert("Fill all fields");
    const res = await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchWorks();
    }
  }

  async function handleUpdate() {
    if (!editId) return;
    const res = await fetch(`/api/works/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setEditId(null);
      fetchWorks();
    }
  }

  async function handleDelete(id: string) {
    const confirmed = confirm("Delete this work?");
    if (!confirmed) return;
    const res = await fetch(`/api/works/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchWorks();
    }
  }

  function startEdit(work: Work) {
    setEditId(work.id);
    setTitle(work.title);
    setDescription(work.description);
  }

  return (
    <Column gap="l" padding="xl">
      <Heading variant="display-strong-l">Works</Heading>

      <Column gap="m" style={{ maxWidth: 400 }}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title" id={""}        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description" id={""}        />
        {editId ? (
          <Button onClick={handleUpdate}>Update</Button>
        ) : (
          <Button onClick={handleAdd}>Add New</Button>
        )}
      </Column>

      <Column gap="s" style={{ marginTop: 20 }}>
        {works.map((work) => (
          <Row
            key={work.id}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "0.5rem 0",
            }}
          >
            <Link href={`/works/${work.id}`} style={{ fontWeight: 600 }}>
              {work.title}
            </Link>
            <div>
              <Button
                variant="tertiary"
                onClick={() => startEdit(work)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(work.id)}>
                Delete
              </Button>
            </div>
          </Row>
        ))}
      </Column>
    </Column>
  );
}
