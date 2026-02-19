import PortfolioSlider from "@/components/sliders/PortfolioSlider";
export default function SlidePortafolio() {
  return(
    <section className="py-24">
      <h2 className="text-4xl font-bold mb-10">
        Proyectos destacados
      </h2>
      <PortfolioSlider />
    </section>
  );
}