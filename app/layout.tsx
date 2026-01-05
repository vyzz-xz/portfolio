import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], 
  variable: "--font-redhat", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhamad Hafiz | Tech Enthusiast",
  description: "Portfolio of Muhamad Hafiz - UI Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatText.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        
      </body>
    </html>
  );
}
