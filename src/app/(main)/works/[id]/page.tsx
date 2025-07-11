// Remove "use client"

import { Heading, Text, Column, Badge, Button, Row } from "@once-ui-system/core";
import { notFound } from "next/navigation";

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
  const currentIndex = works.findIndex((item) => item.id === params.id);
  const work = works[currentIndex];

  if (!work) {
    return notFound();
  }

  const totalPages = works.length;
  const currentPage = currentIndex + 1;

  return (
    <Column gap="l" padding="xl" style={{ minHeight: "80vh" }}>
      <Badge textVariant="display-strong-s">My Works </Badge>

      <Heading variant="display-strong-l">{work.title}</Heading>

      <Text variant="heading-default-l" onBackground="neutral-medium">
        {work.description}
      </Text>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </Column>
  );
}

// Separate client component for Pagination buttons with router
"use client";

import { useRouter } from "next/navigation";
import { Button, Row } from "@once-ui-system/core";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();

  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      router.push(`/works/${pageNum}`);
    }
  };

  return (
    <Row gap="s" wrap justify="center" marginTop="xl" align="center">
      <Button
        variant="outline"
        size="s"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;

        return (
          <Button
            key={pageNum}
            variant={isActive ? "solid" : "ghost"}
            size="s"
            style={{
              minWidth: 40,
              color: isActive ? "white" : "black",
              backgroundColor: isActive ? "black" : "transparent",
              fontWeight: isActive ? "700" : "500",
              borderColor: isActive ? "black" : undefined,
            }}
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="s"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </Row>
  );
}
