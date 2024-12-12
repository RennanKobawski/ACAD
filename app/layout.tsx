import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import AuthProvider from "./_providers/auth";
import Footer from "./_components/Footer";
import { Toaster } from "./_components/_ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

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
        className={`${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
