"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Line,
  LetterFx,
  Input,
  Textarea,
} from "@once-ui-system/core";

export default function Home() {
  return (
    <Column fillWidth style={{ scrollBehavior: "smooth" }}>
      {/* SECTION 1: HERO */}
      <Column
        id="hero"
        fillWidth
        center
        padding="l"
        style={{ minHeight: "100vh" }}
      >
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
              marginX="4"
            >
              <LetterFx trigger="instant">Besignz</LetterFx>
            </Text>
            <Line vert background="neutral-alpha-strong" />
            <Text variant="display-strong-l" marginX="4">
              <LetterFx trigger="instant">
                Designs anything as you wish
              </LetterFx>
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
            I&apos;am a Technology Enthusiast
          </Text>

          <Button
            href="https://dribbble.com/benyadin17"
            data-border="rounded"
            weight="default"
            prefixIcon="copy"
            arrowIcon
          >
            Explore my works
          </Button>

          {/* Tombol Scroll ke Contact */}
          <Button
            href="#contact"
            variant="tertiary"
            size="s"
            style={{ marginTop: 32 }}
          >
            Contact Me ↓
          </Button>
        </Column>
      </Column>

      {/* SECTION 2: CONTACT */}
      <Column
        id="contact"
        fillWidth
        center
        padding="l"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
          borderTop: "1px solid #ccc",
        }}
      >
        <Column maxWidth="s" align="start" gap="m">
          <Heading variant="display-strong-s">Email Me</Heading>

          <Input label="Name" placeholder="Your name" required id={""} />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            required id={""}          />
          <Textarea
            label="Message"
            placeholder="Type your message..."
            required id={""}          />

          <Button type="submit" style={{ marginTop: 12 }}>
            Send Message
          </Button>
        </Column>
      </Column>
    </Column>
  );
}
