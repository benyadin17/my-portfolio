"use client";

import { Column, Row, Text, Button } from "@once-ui-system/core";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Column
      as="footer"
      padding="m"
      className="bg-gray-100 text-center items-center"
    >
      <Row
        gap="m"
        className="justify-center flex-wrap mb-4 gap-x-4"
      >
        <SocialIcon
          href="https://x.com/besignz"
          label="Twitter"
          color="#1DA1F2"
        >
          <FaTwitter size={20} />
        </SocialIcon>

        <SocialIcon
          href="https://instagram.com/sketchwithme_b"
          label="Instagram"
          color="#E4405F"
        >
          <FaInstagram size={20} />
        </SocialIcon>

        <SocialIcon
          href="https://id.linkedin.com/in/beny-adi-nugraha-8879a11a3"
          label="LinkedIn"
          color="#0077B5"
        >
          <FaLinkedin size={20} />
        </SocialIcon>

        <SocialIcon
          href="https://github.com/benyadin17"
          label="GitHub"
          color="#333"
        >
          <FaGithub size={20} />
        </SocialIcon>
      </Row>

      <Row gap="s" wrap className="justify-center mt-4 flex-wrap text-sm">
        <Text size="m">© 2025 Besignz. All rights reserved.</Text>
        <Link href="/privacy-policy" className="underline ml-4 text-inherit">
          Privacy Policy
        </Link>
        <Link href="/terms" className="underline ml-4 text-inherit">
          Terms of Service
        </Link>
      </Row>
    </Column>
  );
}

function SocialIcon({
  href,
  label,
  color,
  children,
}: {
  href: string;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <Button
        size="s"
        aria-label={label}
        style={{
          backgroundColor: color,
          color: "white",
          borderRadius: "50%",
          width: 40,
          height: 40,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Button>
    </Link>
  );
}
export { Footer };
