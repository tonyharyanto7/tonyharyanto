import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar";
import "@/app/styles/globals.css";
import "@/app/styles/card.css";
import "@/app/styles/blurred-img.css";
import config from "/CONFIG.json";
import Script from "next/script";
import CustomCursor from "@/components/cursor";

const deliusFont = localFont({
  src: "./fonts/DeliusSwashCaps-Regular.ttf",
  variable: "--font-delius",
  weight: "100 900",
});

const fonts = {
  delius: deliusFont,
};

export const metadata = {
  title: config.siteMetadata.title,
  description: config.siteMetadata.description,
};

export default function RootLayout({ children }) {
  const selectedFont = fonts[config.global.font] || deliusFont;

  return (
    <html lang="en">
      <body className={`${selectedFont.variable} antialiased`}>
        <CustomCursor />
        <Navbar />
        <main className="p-4">{children}</main>
        <Script src="scripts/hover.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
