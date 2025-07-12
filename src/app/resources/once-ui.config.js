// src/fonts.ts
import { Inter } from "next/font/google";
import { Fira_Code } from "next/font/google";

const heading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const fonts = {
  primary: { variable: '--font-heading' },
  secondary: { variable: '--font-body' },
  tertiary: { variable: '--font-label' },
  code: { variable: '--font-code' },
};
