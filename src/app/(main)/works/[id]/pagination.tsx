// src/app/(main)/works/[id]/Pagination.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button, Row } from "@once-ui-system/core";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps): JSX.Element {
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
