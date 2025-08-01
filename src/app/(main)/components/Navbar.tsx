"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi";
import { Logo, Row, Button, Column } from "@once-ui-system/core";

// Komponen Avatar dengan inisial dari nama
function Avatar({ name }: { name?: string | null }) {
  if (!name) return null;

  const initials = name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: "#2563eb",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 14,
        userSelect: "none",
      }}
      title={name}
      aria-label={`Avatar of ${name}`}
    >
      {initials}
    </div>
  );
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMenuLinks = () =>
    menuItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: 8,
            backgroundColor: isActive ? "#e0e7ff" : "transparent",
            color: isActive ? "#1d4ed8" : "#333",
            fontWeight: isActive ? 600 : 500,
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onClick={() => isMobile && setMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    });

  // Desktop navbar horizontal di atas (bukan sidebar)
  if (!isMobile) {
    return (
      <nav
        className="display-flex flex-column position-relative"
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
        <div
          className="display-flex position-relative"
          style={{
            height: 40,
            textAlign: "center",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          {/* Logo + Brand */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Row
              align="center"
              gap="s"
              style={{ cursor: "pointer", fontWeight: "bold", fontSize: 18 }}
            >
              <Logo size="l" />
              <span>BESIGNZ |</span>
            </Row>
          </Link>

          {/* Menu tengah */}
          <div
            id="menu-desktop"
            className="display-flex g-m position-relative"
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
              userSelect: "none",
              gap: "0.5rem",
            }}
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
          </div>

          {/* Session avatar + sign out (hapus nama) */}
          {session && (
            <div
              className="display-flex g-s position-relative"
              style={{
                textAlign: "center",
                marginRight: 12,
                alignItems: "center",
                display: "flex",
                gap: 8,
                minWidth: 100,
                justifyContent: "flex-end",
              }}
            >
              <Avatar name={session.user?.name} />
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="tertiary"
                style={{ padding: "0.3rem 0.75rem", fontSize: 14, borderRadius: 6 }}
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </nav>
    );
  }

 // bagian mobile navbar fixed on top
return (
  <>
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <Row align="center" gap="s" style={{ alignItems: "center" }}>
        <Logo size="l" />
        <span style={{ fontWeight: "bold", fontSize: 18 }}>BESIGNZ</span>
      </Row>

      <Row align="center" gap="s" style={{ alignItems: "center" }}>
        {session && <Avatar name={session.user?.name} />}
        <Button
          onClick={() => setMenuOpen(!menuOpen)}
          variant="tertiary"
          style={{ background: "transparent", boxShadow: "none" }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </Button>
      </Row>
    </div>

    {menuOpen && (
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(6px)",
          zIndex: 999,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <Column gap="s">{renderMenuLinks()}</Column>

        <div>
          {session ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="secondary"
              style={{ width: "100%", borderRadius: 6 }}
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="secondary" style={{ width: "100%", borderRadius: 6 }}>
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    )}
  </>
);
}

export { Navbar };
