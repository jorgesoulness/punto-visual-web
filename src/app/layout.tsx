import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import SectionScroll from "@/components/navigation/SectionScroll";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Punto Visual — Agencia de Marketing Digital",
    template: "%s | Punto Visual",
  },
  description: "Creatividad, growth marketing, desarrollo web e inteligencia artificial para impulsar marcas y negocios.",
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
    <html lang="es-MX" data-scroll-behavior="smooth" className={montserrat.variable}>
      <body className="bg-background text-foreground antialiased">
        <MotionProvider>
          <Preloader />
          <a href="#contenido" className="sr-only fixed left-4 top-4 z-[100] rounded bg-primary px-5 py-3 text-black focus:not-sr-only">Ir al contenido</a>
          <Header />
          <SectionScroll />
          <main id="contenido" tabIndex={-1}>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
