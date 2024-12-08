import localFont from "next/font/local";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

const delius = localFont({
  src: "./fonts/DeliusSwashCaps-Regular.ttf",
  variable: "--font-delius",
  weight: "100 900",
});

export const metadata = {
  title: "Portfolio - Maxim",
  description: "Portfolio page by max1mde",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${delius.variable} antialiased`}>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
