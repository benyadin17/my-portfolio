"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Row, Column, Button, Logo } from "@once-ui-system/core";
import { HiMenu, HiX } from "react-icons/hi";

const works = [
  { id: "1", title: "Redesign Company Website" },
  { id: "2", title: "Mobile App Development" },
  { id: "3", title: "Brand Identity Design" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/profile" },
    { label: "Works", href: "/works/1" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/not-found" },
    { label: "Contact", href: "/#contact" },
    { label: "Redux Demo", href: "/redux-demo" },
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
        borderRadius: 16,
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
          variant="tertiary"
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

        {session ? (
          <Row align="center" gap="s" style={{ marginTop: 12, marginRight: 12 }}>
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      backgroundColor: "#2563eb",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: 14,
    }}
    title={session.user?.name || ""}
  >
    {session.user?.name?.charAt(0) || "U"}
  </div>
  <Button
    variant="tertiary"
    onClick={() => signOut({ callbackUrl: "/" })}
    style={{ padding: "0.3rem 0.75rem", fontSize: 14, borderRadius: 6 }}
  >
    Sign out
  </Button>
</Row>

        ) : (
          <Link href="/login">
            <Button
              variant="tertiary"
              style={{ borderRadius: 6, padding: "0.3rem 0.75rem", fontSize: 14 }}
            >
              Login
            </Button>
          </Link>
        )}
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
          {session ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              style={{
                padding: "0.75rem 1.5rem",
                color: "white",
                textAlign: "left",
                background: "none",
                border: "none",
                fontWeight: 600,
              }}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.75rem 1.5rem",
                color: "white",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          )}
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
