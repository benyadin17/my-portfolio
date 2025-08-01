"use client";

import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";

import classNames from "classnames";
import { Column } from "@once-ui-system/core";
import config from "../resources/once-ui.config";
import React, { useState, useEffect } from "react";

import Navbar from "../(main)/components/Navbar";
import Footer from "../(main)/components/Footer";
import { Providers } from "@/components/Providers";

const { fonts } = config;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navbarHeight = isMobile ? 60 : 80;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(
        fonts.primary.variable,
        fonts.secondary.variable,
        fonts.tertiary.variable,
        fonts.code.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                const root = document.documentElement;
                const defaultTheme = 'system';
                root.setAttribute('data-neutral', 'gray');
                root.setAttribute('data-brand', 'blue');
                root.setAttribute('data-accent', 'indigo');
                root.setAttribute('data-solid', 'contrast');
                root.setAttribute('data-solid-style', 'flat');
                root.setAttribute('data-border', 'playful');
                root.setAttribute('data-surface', 'filled');
                root.setAttribute('data-transition', 'all');
                root.setAttribute('data-scaling', '100');
                root.setAttribute('data-viz-style', 'categorical');

                const resolveTheme = (themeValue) => {
                  if (!themeValue || themeValue === 'system') {
                    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  return themeValue;
                };

                const theme = localStorage.getItem('data-theme');
                const resolvedTheme = resolveTheme(theme);
                root.setAttribute('data-theme', resolvedTheme);

                const styleKeys = ['neutral', 'brand', 'accent', 'solid', 'solid-style', 'viz-style', 'border', 'surface', 'transition', 'scaling'];
                styleKeys.forEach(key => {
                  const value = localStorage.getItem('data-' + key);
                  if (value) {
                    root.setAttribute('data-' + key, value);
                  }
                });
              } catch (e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: navbarHeight,
            zIndex: 100,
            backgroundColor: "var(--once-ui-surface-background, white)",
            boxShadow: "0 2px 4px rgb(0 0 0 / 0.1)",
            padding: "0 1rem",
            boxSizing: "border-box",
          }}
        >
          <Navbar />
        </div>

        <main
          className="flex-grow"
          style={{ paddingTop: navbarHeight, minHeight: `calc(100vh - ${navbarHeight}px)` }}
        >
          <Column fillWidth background="page" margin="0" padding="0">
            {children}
          </Column>
        </main>

        <Footer />
      </body>
    </html>
  );
}
