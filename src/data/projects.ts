export type Project = {
  slug: string;
  title: string;
  description: string;
  services: string[];
  image: string;
};

export const projects: Project[] = [
  {
    slug: "web-equlity-design",
    title: "Equlity UI Design",
    description: "Sitio corporativo enfocado en conversión y presencia profesional.",
    services: ["Diseño UI", "SEO", "CRM"],
    image: "/img/portfolio/web-equality-demo.jpg",
  },
  {
    slug: "web-design-punto-visual-old",
    title: "Punto visual UI",
    description: "Landing page optimizada para campañas digitales.",
    services: ["UX/UI", "Desarrollo Web", "Branding"],
    image: "/img/portfolio/web-punto-visual-old.jpg",
  },
  {
    slug: "web-isi-cosmetics-ui",
    title: "ISI Cosmetics UI",
    description: "Landing page optimizada para campañas digitales.",
    services: ["UX/UI", "Desarrollo Web", "Shopify"],
    image: "/img/portfolio/web-isi-cosmetics-demo.jpg",
  },
  {
    slug: "web-ui-design-demo",
    title: "UI Design Demo",
    description: "Landing page optimizada para campañas digitales.",
    services: ["UX/UI", "Desarrollo Web"],
    image: "/img/portfolio/web-demo-design.jpg",
  },
];