import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthProvider from "./_providers/auth";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "VTX3 - CET Santos",
  description: "Site moderno e responsivo para a CET de Santos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
