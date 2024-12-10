/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
import localFont from "next/font/local";
import Navbar from "@/components/ui/navbar";
import "@/app/styles/globals.css";
import "@/app/styles/card.css";
import "@/app/styles/blurred-img.css";
import config from "/CONFIG.json";
import Script from "next/script";

import CustomCursor from "@/components/cursor";
import Footer from "@/components/ui/footer";

import Head from "next/head";

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
};

export default function RootLayout({ children }) {
  const selectedFont = fonts[config.global.font] || deliusFont;

  return (
    <html lang="en">
      <Head>
        <Script src="scripts/scroll.js" strategy="afterInteractive" />
      </Head>

      <body
        className={`${selectedFont.variable} antialiased flex flex-col min-h-screen`}
      >
        {config.global.custom_cursor.enabled && <CustomCursor />}
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
        <Footer config={config} />

      </body>
    </html>
  );
}
