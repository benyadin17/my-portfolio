"use client";

import { Column, Row, Text, Button } from "@once-ui-system/core";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Column
      as="footer"
      padding="m"
      style={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Row
        justify="center"
        gap="m"
        marginBottom="m"
        style={{ justifyContent: "center" }}
      >
        {/* Twitter */}
        <Link
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            size="s"
            aria-label="Twitter"
            style={{
              backgroundColor: "#1DA1F2",
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
            <FaTwitter size={20} />
          </Button>
        </Link>

        {/* Instagram */}
        <Link
          href="https://instagram.com/sketchwithme_b"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            size="s"
            aria-label="Instagram"
            style={{
              backgroundColor: "#E4405F",
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
            <FaInstagram size={20} />
          </Button>
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            size="s"
            aria-label="LinkedIn"
            style={{
              backgroundColor: "#0077B5",
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
            <FaLinkedin size={20} />
          </Button>
        </Link>

        {/* GitHub */}
        <Link
          href="https://github.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            size="s"
            aria-label="GitHub"
            style={{
              backgroundColor: "#333",
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
            <FaGithub size={20} />
          </Button>
        </Link>
      </Row>

      <Row
        justify="center"
        gap="s"
        wrap
        style={{ justifyContent: "center", marginTop: 16 }}
      >
        <Text size="sm">© 2025 Besignz. All rights reserved.</Text>
        <Link
          href="/privacy-policy"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "inherit",
            marginLeft: 16,
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "inherit",
            marginLeft: 16,
          }}
        >
          Terms of Service
        </Link>
      </Row>
    </Column>
  );
}
