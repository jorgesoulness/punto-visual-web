export const contactServices = ["Branding", "Diseño web", "Growth marketing", "Contenido & redes", "IA & automatización", "Necesito orientación"];
export const contactBudgets = ["Por definir", "Hasta $15,000 MXN", "$15,000–$40,000 MXN", "$40,000–$80,000 MXN", "Más de $80,000 MXN"];
export const contactTimelines = ["Estoy explorando", "Lo antes posible", "En 1–3 meses", "Más adelante"];

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  idea: string;
  budget: string;
  timeline: string;
  consent: boolean;
  website: string; // Campo invisible para detectar envíos automáticos.
};
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const emptyContact: ContactValues = {
  name: "", email: "", company: "", phone: "", services: [], idea: "",
  budget: "Por definir", timeline: "Estoy explorando", consent: false, website: "",
};

export function validateContact(input: unknown): { values: ContactValues; errors: ContactErrors } {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const text = (key: string) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const values: ContactValues = {
    name: text("name"), email: text("email"), company: text("company"), phone: text("phone"),
    services: Array.isArray(raw.services) ? [...new Set(raw.services.filter((value): value is string => typeof value === "string"))] : [],
    idea: text("idea"), budget: text("budget") || emptyContact.budget, timeline: text("timeline") || emptyContact.timeline,
    consent: raw.consent === true, website: text("website"),
  };
  const errors: ContactErrors = {};
  if (values.name.length < 2 || values.name.length > 80) errors.name = "Escribe tu nombre (entre 2 y 80 caracteres).";
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Escribe un correo válido, por ejemplo: hola@tumarca.com.";
  if (values.company.length > 120) errors.company = "El nombre de tu marca debe tener máximo 120 caracteres.";
  if (values.phone && (!/^\+?[\d\s().-]+$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7 || values.phone.replace(/\D/g, "").length > 15 || values.phone.length > 30)) errors.phone = "Escribe un teléfono válido con 7 a 15 dígitos.";
  if (!values.services.length || values.services.some(service => !contactServices.includes(service))) errors.services = "Elige al menos una opción. También puedes pedir orientación.";
  if (values.idea.length < 20 || values.idea.length > 2000) errors.idea = "Cuéntanos un poco más: entre 20 y 2,000 caracteres.";
  if (!contactBudgets.includes(values.budget)) errors.budget = "Selecciona una opción de inversión.";
  if (!contactTimelines.includes(values.timeline)) errors.timeline = "Selecciona cuándo te gustaría comenzar.";
  if (!values.consent) errors.consent = "Necesitamos tu autorización para contactarte sobre esta idea.";
  if (values.website) errors.website = "No pudimos validar tu solicitud. Escríbenos por correo.";
  return { values, errors };
}

export function contactMessage(values: ContactValues) {
  return [
    "NUEVA IDEA · PUNTO VISUAL", "", `Nombre: ${values.name}`, `Correo: ${values.email}`,
    `Marca / negocio: ${values.company || "Por definir"}`, `Teléfono: ${values.phone || "No indicado"}`,
    `Servicios: ${values.services.join(", ")}`, `Inversión: ${values.budget}`, `Inicio: ${values.timeline}`,
    "", "LA IDEA", values.idea, "", "Autorizó ser contactado sobre este proyecto.",
  ].join("\n");
}
