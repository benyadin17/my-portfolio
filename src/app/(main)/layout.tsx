import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";

import classNames from "classnames";
import { Column } from "@once-ui-system/core";
import { fonts } from "../resources/once-ui.config";
import React from "react";
import {
  ThemeProvider,
  DataThemeProvider,
  ToastProvider,
  IconProvider,
} from "@once-ui-system/core";
import type { Metadata } from "next";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Besignz Portfolio",
  description: "Technology & Creative Portfolio by Beny",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(
        fonts.primary.variable,
        fonts.secondary.variable,
        fonts.tertiary.variable,
        fonts.code.variable,
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
      <body>
        <ThemeProvider>
          <DataThemeProvider>
            <ToastProvider>
              <IconProvider>
                <Column
                  fillWidth
                  background="page"
                  margin="0"
                  padding="0"
                  style={{ minHeight: "90vh" }}
                >
                  <Navbar />
                  {children}
                  <Footer />
                </Column>
              </IconProvider>
            </ToastProvider>
          </DataThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
