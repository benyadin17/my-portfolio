"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Column, Heading, Row, Button } from "@once-ui-system/core";

type Work = {
  id: string;
  title: string;
  description: string;
};

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);

  async function fetchWorks() {
    const res = await fetch("/api/works");
    const data = await res.json();
    setWorks(data);
  }

  useEffect(() => {
    fetchWorks();
  }, []);

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
    // Redirect to the edit page for the selected work
    window.location.href = `/works/${work.id}/edit`;
  }

  return (
    <Column gap="l" padding="xl">
      <Heading variant="display-strong-l">Works</Heading>

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
