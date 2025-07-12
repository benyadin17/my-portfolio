// src/fonts.ts
import { Inter, Fira_Code } from 'next/font/google';

export const geistSans = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

export const geistMono = Fira_Code({
  subsets: ['latin'],
  variable: '--font-code',
  display: 'swap',
});
