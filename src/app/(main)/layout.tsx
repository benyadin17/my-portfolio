import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";

import classNames from "classnames";
import { Column } from "@once-ui-system/core";
import config from "../resources/once-ui.config";
import type { Metadata } from "next";

import Navbar from "../(main)/components/Navbar";
import Footer from "../(main)/components/Footer";
import { Providers } from "@/components/Providers";

const { fonts } = config;

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
      className={classNames(
        fonts.primary.variable,
        fonts.secondary.variable,
        fonts.tertiary.variable,
        fonts.code.variable
      )}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            <Column fillWidth background="page" margin="0" padding="0">
              {children}
            </Column>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
