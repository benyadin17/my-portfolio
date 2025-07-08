"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
} from "@once-ui-system/core";

export default function Home() {
  return (
    <Column fillWidth center padding="l" style={{ minHeight: "100vh" }}>
      <Column maxWidth="s" horizontal="center" gap="l" align="center">
        <Badge
          textVariant="code-default-s"
          border="neutral-alpha-medium"
          onBackground="neutral-medium"
          vertical="center"
          gap="16"
        >
           <Text
            variant="display-strong-xs"
            onBackground="brand-medium"
            wrap="balance"
            marginX="4">
            <LetterFx trigger="instant">Besignz</LetterFx>
          </Text>
          <Line vert background="neutral-alpha-strong" />
          <Text variant="display-strong-l" marginX="4">
            <LetterFx trigger="instant">Designs anything as you wish</LetterFx>
          </Text>
        </Badge>
        <Heading variant="display-strong-xl" marginTop="24">
          This is My Portfolio
        </Heading>
        <Text
          variant="heading-default-xl"
          onBackground="neutral-weak"
          wrap="balance"
          marginBottom="16"
        >
          I'am a Technology Enthusiast
        </Text>
        <Button
          id="docs"
          href="https://dribbble.com/benyadin17"
          data-border="rounded"
          weight="default"
          prefixIcon="copy"
          arrowIcon
        >
          Explore my works
        </Button>
      </Column>
    </Column>
  );
}
