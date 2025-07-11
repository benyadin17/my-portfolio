"use client";

import { useState } from "react";
import { Heading, Text, Column, Badge, Button, Row } from "@once-ui-system/core";
import { notFound, useRouter } from "next/navigation";

// Dummy data
const works = [
  { id: "1", title: "Redesign Company Website", description: "A complete UI/UX overhaul using Figma & Tailwind." },
  { id: "2", title: "Mobile App Development", description: "Created a cross-platform app using Flutter for a startup." },
  { id: "3", title: "Brand Identity Design", description: "Designed logo, typography, and guidelines for a new brand." },
];

interface Props {
  params: { id: string };
}

export default function WorkDetail({ params }: Props) {
  const router = useRouter();
  const currentIndex = works.findIndex((item) => item.id === params.id);
  const work = works[currentIndex];

  if (!work) {
    return notFound();
  }

  const totalPages = works.length;
  const currentPage = currentIndex + 1;

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      router.push(`/works/${pageNum}`);
    }
  };

  return (
    <Column gap="l" padding="xl" style={{ minHeight: "80vh" }}>
      <Badge textVariant="display-strong-s">My Works </Badge>

      <Heading variant="display-strong-l">{work.title}</Heading>

      <Text variant="heading-default-l" onBackground="neutral-medium">
        {work.description}
      </Text>

      {/* Pagination */}
      <Row gap="s" wrap justify="center" marginTop="xl" align="center">
        {/* Previous */}
        <Button
          variant="outline"
          size="s"
          disabled={currentIndex === 0}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </Button>

        {/* Numbered buttons */}
        {works.map((w, i) => {
          const isActive = w.id === params.id;
          return (
            <Button
              key={w.id}
              variant={isActive ? "solid" : "ghost"}
              size="s"
              style={{
                minWidth: 40,
                color: isActive ? "white" : "black",
                backgroundColor: isActive ? "black" : "transparent",
                fontWeight: isActive ? "700" : "500",
                borderColor: isActive ? "black" : undefined,
              }}
              onClick={() => goToPage(Number(w.id))}
            >
              {i + 1}
            </Button>
          );
        })}

        {/* Next */}
        <Button
          variant="outline"
          size="s"
          disabled={currentIndex === totalPages - 1}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </Button>
      </Row>
    </Column>
  );
}
