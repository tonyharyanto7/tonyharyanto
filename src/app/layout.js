/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
import localFont from "next/font/local";
import Navbar from "@/components/custom/navbar";
import "@/app/styles/globals.css";
import "@/app/styles/card.css";
import "@/app/styles/blurred-img.css";
import config from "/CONFIG.json";
import Script from "next/script";

import CustomCursor from "@/components/custom/cursor";
import Footer from "@/components/custom/footer";

const deliusFont = localFont({
  src: "./fonts/DeliusSwashCaps-Regular.ttf",
  variable: "--font-custom",
  weight: "100 900",
});

const robotoFont = localFont({
  src: "./fonts/Roboto-Medium.ttf",
  variable: "--font-custom",
  weight: "100 900",
});

const audiowideFont = localFont({
  src: "./fonts/Audiowide-Regular.ttf",
  variable: "--font-custom",
  weight: "100 900",
});

const fonts = {
  delius: deliusFont,
  roboto: robotoFont,
  audiowide: audiowideFont,
};

export const metadata = {
  title: config.siteMetadata.title,
  description: config.siteMetadata.description,
  openGraph: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    images: [{ url: config.pages.home.profile_image }],
  },
  twitter: {
    card: config.siteMetadata.embeds?.twitter_card || "summary_large_image",
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    images: [config.pages.home.profile_image],
  },
  other: {
    "theme-color": config.siteMetadata.embeds?.color || "#ce6419",
  },
};

export default function RootLayout({ children }) {
  const selectedFont = fonts[config.global.font] || deliusFont;

  return (
    <html lang="en">
      <body
        className={`${selectedFont.variable} antialiased flex flex-col min-h-screen`}
      >
        <link rel="preconnect" href="https://img.shields.io"></link>

        {config.global.custom_cursor.enabled && <CustomCursor />}
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
        <Footer config={config} />
        <Script src="scripts/hover.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
