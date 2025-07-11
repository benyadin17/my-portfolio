"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Row, Column, Button, Logo } from "@once-ui-system/core";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Profile", href: "/profile" },
    { label: "Works", href: "/works/1" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/not-found" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <Column
      as="nav"
      style={{
        backdropFilter: "blur(12px) saturate(180%) brightness(110%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%) brightness(110%)",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        color: "black",
        position: "sticky",
        top: 20,
        zIndex: 1000,
        paddingTop: 5,
        userSelect: "none",
        margin: "0 1rem",
      }}
    >
      <Row
        align="center"
        style={{ height: 40, justifyContent: "space-between", display: "flex" }}
      >
        <Button
          variant="ghost"
          style={{
            display: "none",
            color: "black",
            padding: 10,
            borderRadius: 6,
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          id="hamburger-button"
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </Button>

        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Row align="center" gap="s" style={{ cursor: "pointer" }}>
            <Logo size="l" />
            <span style={{ fontWeight: "bold", fontSize: 18, paddingTop: 8 }}>
              Besignz |
            </span>
          </Row>
        </Link>

        <Row
          gap="m"
          style={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
            userSelect: "none",
          }}
          id="menu-desktop"
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  color: isActive ? "#2563eb" : "black",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: isActive ? "underline" : "none",
                  userSelect: "none",
                  transition: "background-color 0.2s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </Row>

        <Button
          variant="ghost"
          style={{ borderRadius: "50%", padding: 0, width: 40, height: 40 }}
          aria-label="User menu"
        />
      </Row>

      {menuOpen && (
        <Column
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#374151",
            padding: "0.5rem 0",
          }}
          id="mobile-menu"
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "0.75rem 1.5rem",
                  color: isActive ? "#60a5fa" : "white",
                  textDecoration: "none",
                  fontWeight: isActive ? 700 : 600,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </Column>
      )}

      <style jsx>{`
        #hamburger-button {
          display: none;
        }
        #menu-desktop {
          display: flex;
        }
        @media (max-width: 768px) {
          #hamburger-button {
            display: inline-flex;
          }
          #menu-desktop {
            display: none;
          }
        }
      `}</style>
    </Column>
  );
}
