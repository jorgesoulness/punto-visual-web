import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Punto Visual — Agencia de Marketing Digital",
    template: "%s | Punto Visual",
  },
  description: "Diseño y desarrollo web para marcas y negocios que buscan crecer con presencia digital profesional.",
  metadataBase: new URL("https://punto-visual.mx"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://punto-visual.mx",
    siteName: "Punto Visual",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Punto Visual — Agencia de Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={montserrat.variable}>
      <body className="bg-background text-foreground antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}