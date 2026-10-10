import { NextRequest, NextResponse } from "next/server";
import { contactMessage, validateContact } from "@/lib/contact";
import { contactEmail } from "@/data/site";

export const runtime = "nodejs";

// Límite básico por instancia; evita ráfagas sin guardar el contenido del formulario.
const attempts = new Map<string, { count: number; expires: number }>();
function rateLimited(key: string) {
  const now = Date.now();
  for (const [ip, entry] of attempts) if (entry.expires <= now) attempts.delete(ip);
  const current = attempts.get(key);
  if (current && current.count >= 5) return true;
  if (!current && attempts.size >= 1000) return true;
  attempts.set(key, { count: (current?.count ?? 0) + 1, expires: current?.expires ?? now + 600_000 });
  return false;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ message: "No pudimos validar el origen de la solicitud." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ message: "Formato de solicitud inválido." }, { status: 415 });
  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > 16_384) return NextResponse.json({ message: "El mensaje es demasiado largo." }, { status: 413 });

  let input: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 16_384) return NextResponse.json({ message: "El mensaje es demasiado largo." }, { status: 413 });
    input = JSON.parse(body);
  } catch { return NextResponse.json({ message: "No pudimos leer tu mensaje." }, { status: 400 }); }
  const { values, errors } = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ message: "Revisa los campos indicados.", errors }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ message: "El envío directo no está disponible en este momento. Puedes enviarnos tu idea desde tu correo." }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ message: "Has enviado varias solicitudes. Espera unos minutos o escríbenos directamente." }, { status: 429 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [contactEmail], reply_to: values.email, subject: `Nueva idea: ${values.services.join(" + ")}`, text: contactMessage(values) }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return NextResponse.json({ message: "No pudimos enviar tu idea. Tus datos siguen aquí: inténtalo de nuevo o continúa por correo." }, { status: 502 });
    const result = await response.json();
    if (!result.id) return NextResponse.json({ message: "No pudimos confirmar el envío. Puedes continuar desde tu correo." }, { status: 502 });
    return NextResponse.json({ message: "Recibimos tu idea. Gracias por pensar en Punto Visual." });
  } catch { return NextResponse.json({ message: "No pudimos confirmar el envío. Conservamos tu mensaje en el formulario para que puedas continuar por correo." }, { status: 502 }); }
}
