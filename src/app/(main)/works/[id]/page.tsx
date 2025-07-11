import { Heading, Text, Column, Badge } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import Pagination from "./pagination";

const works = [
  { id: "1", title: "Redesign Company Website", description: "A complete UI/UX overhaul using Figma & Tailwind." },
  { id: "2", title: "Mobile App Development", description: "Created a cross-platform app using Flutter for a startup." },
  { id: "3", title: "Brand Identity Design", description: "Designed logo, typography, and guidelines for a new brand." },
];

export default function WorkDetail({ params }: { params: { id: string } }) {
  const currentIndex = works.findIndex((item) => item.id === params.id);
  if (currentIndex === -1) {
    return notFound();
  }
  const work = works[currentIndex];
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
