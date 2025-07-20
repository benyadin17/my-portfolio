import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import { Providers } from "@/components/Providers";
import Navbar from "../(main)/components/Navbar";
import Footer from "../(main)/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
