import { growthSteps } from "@/data/site";

export default function GrowthProcess() {
  return (
    <section id="proceso" tabIndex={-1} aria-labelledby="process-title" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="mb-4 text-xs tracking-[.2em] text-primary">CÓMO TRABAJAMOS</p>
        <h2 id="process-title" className="max-w-xl text-4xl text-white sm:text-5xl">Las buenas ideas necesitan dirección.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {growthSteps.map((step) => <article key={step.number} className="border-t border-primary/30 pt-6"><span className="text-sm text-primary">{step.number}</span><h3 className="mb-3 mt-5 text-2xl text-white">{step.title}</h3><p className="text-sm leading-relaxed text-foreground/75">{step.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
