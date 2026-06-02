import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "DocFlow — Invoice PDFs to Google Sheets",
  description:
    "Drop GST invoices in Google Drive; mapped rows append to your spreadsheet automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
