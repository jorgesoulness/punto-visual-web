import PageTransition from "@/components/motion/PageTransition";
export default function PortafolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
}