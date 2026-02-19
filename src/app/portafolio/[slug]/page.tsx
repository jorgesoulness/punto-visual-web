import Image from "next/image";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.slug === slug
  );
  if (!project) return notFound();
  return (
    <article className="pt-32">
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h1 className="text-5xl font-bold mb-6">
          {project.title}
        </h1>
        <p className="text-xl text-foreground/80 max-w-3xl">
          {project.description}
        </p>
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={700}
          className="rounded-2xl border border-white/10"
          priority
        />
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-semibold mb-6">
          Servicios aplicados
        </h2>
        <ul className="flex gap-4 flex-wrap">
          {project.services.map((service) => (
            <li
              key={service}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
          <h3 className="text-4xl font-bold">
            ¿Quieres un proyecto así?
          </h3>
          <p className="text-foreground/80">
            Diseñamos experiencias digitales enfocadas en resultados.
          </p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 rounded-xl bg-primary text-black font-semibold hover:opacity-90 transition"
          >
            Cotizar proyecto
          </a>
        </div>
      </section>
    </article>
  );
}