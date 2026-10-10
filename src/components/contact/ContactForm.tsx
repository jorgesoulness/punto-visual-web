"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, CheckCheck, Copy, LoaderCircle, Mail, Send } from "lucide-react";
import { contactEmail } from "@/data/site";
import { contactBudgets, contactMessage, contactServices, contactTimelines, emptyContact, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return <div className="min-w-0"><label htmlFor={id} className="mb-2 flex items-center gap-2 text-sm text-white">{label}{optional ? <span className="text-[10px] text-white/40">opcional</span> : <span className="text-primary" aria-hidden="true">*</span>}</label>{children}{error && <p id={`${id}-error`} className="mt-2 text-xs leading-relaxed text-[#ffaba5]">{error}</p>}</div>;
}

type Status = "idle" | "sending" | "success" | "error";
export default function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, services: [] });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const sending = useRef(false);
  const validation = validateContact(values);
  const progress = [!validation.errors.name, !validation.errors.email, !validation.errors.services, !validation.errors.idea].filter(Boolean).length;
  const emailLink = `mailto:${contactEmail}?subject=${encodeURIComponent("Una nueva idea para Punto Visual")}&body=${encodeURIComponent(contactMessage(validation.values))}`;

  useEffect(() => { if (status === "success") resultRef.current?.focus(); }, [status]);

  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (errors[key]) setErrors(previous => ({ ...previous, [key]: validateContact(next).errors[key] }));
    setStatus("idle");
    setMessage("");
    setCopyMessage("");
  }
  function blur(key: keyof ContactValues) {
    setErrors(previous => ({ ...previous, [key]: validateContact(values).errors[key] }));
  }
  function focusError() {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const checked = validateContact(values);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) { setStatus("error"); setMessage("Falta un detalle para conocer tu idea. Revisa los campos marcados."); focusError(); return; }
    sending.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(checked.values), signal: AbortSignal.timeout(20_000) });
      const result = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(result.message || "No pudimos confirmar el envío. Puedes continuar desde tu correo.");
        if (result.errors) { setErrors(result.errors); focusError(); }
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("No pudimos confirmar el envío. Tu idea sigue en el formulario: puedes intentarlo de nuevo o continuar por correo.");
    } finally { sending.current = false; }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(contactMessage(validation.values)); setCopyMessage("Mensaje copiado. Pégalo en tu correo para enviarlo."); }
    catch { setCopyMessage("No pudimos copiarlo automáticamente. Abre el resumen y selecciona el texto."); }
  }
  const attributes = (key: keyof ContactValues) => ({ "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `${key}-error` : undefined });

  if (status === "success") return (
    <div ref={resultRef} tabIndex={-1} className="pv-contact-card flex min-h-[540px] flex-col items-start justify-center p-7 sm:p-10">
      <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black"><CheckCheck size={30} aria-hidden="true" /></span>
      <p className="text-xs tracking-[.2em] text-primary">EL PRIMER PASO ESTÁ DADO</p>
      <h2 className="mb-5 mt-4 text-4xl text-white sm:text-5xl">Tu idea ya está<br />en camino.</h2>
      <p className="max-w-md text-sm leading-relaxed text-white/65">Gracias, {validation.values.name}. Tu mensaje fue enviado a Punto Visual. Podemos continuar la conversación en <span className="break-all text-white">{validation.values.email}</span>.</p>
      <button type="button" onClick={() => { setValues({ ...emptyContact, services: [] }); setErrors({}); setStatus("idle"); }} className="mt-8 flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-sm text-white">Compartir otra idea <ArrowUpRight size={16} aria-hidden="true" /></button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="pv-contact-card p-6 sm:p-9">
      <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-xs tracking-[.18em] text-primary">TU BRIEF CREATIVO</p><h2 className="mt-2 text-2xl text-white">Démosle forma a tu idea.</h2></div>
        <div className="shrink-0 text-right"><span className="text-xs text-white/50">{progress} de 4 detalles</span><div className="mt-2 flex gap-1" aria-hidden="true">{[1,2,3,4].map(step => <span key={step} className={`h-1.5 w-5 rounded-full ${progress >= step ? "bg-primary" : "bg-white/10"}`} />)}</div></div>
      </div>
      <fieldset disabled={status === "sending"} className="min-w-0 space-y-9 disabled:opacity-60">
        <div className="sr-only" aria-hidden="true"><label htmlFor="website">Deja este campo vacío</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => update("website", event.target.value)} /></div>
        <div>
          <p className="mb-5 text-xs tracking-[.12em] text-white/45"><span className="mr-3 text-primary">01</span> EMPECEMOS CONTIGO</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Tu nombre" error={errors.name}><input id="name" name="name" autoComplete="name" required maxLength={80} placeholder="¿Cómo te llamas?" className="pv-contact-input" value={values.name} onChange={event => update("name", event.target.value)} onBlur={() => blur("name")} {...attributes("name")} /></Field>
            <Field id="email" label="Correo electrónico" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="hola@tumarca.com" className="pv-contact-input" value={values.email} onChange={event => update("email", event.target.value)} onBlur={() => blur("email")} {...attributes("email")} /></Field>
            <Field id="company" label="Marca o negocio" optional error={errors.company}><input id="company" name="company" autoComplete="organization" maxLength={120} placeholder="Tu marca, o una por crear" className="pv-contact-input" value={values.company} onChange={event => update("company", event.target.value)} onBlur={() => blur("company")} {...attributes("company")} /></Field>
            <Field id="phone" label="Teléfono / WhatsApp" optional error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+52 664 000 0000" className="pv-contact-input" value={values.phone} onChange={event => update("phone", event.target.value)} onBlur={() => blur("phone")} {...attributes("phone")} /></Field>
          </div>
        </div>
        <fieldset className="min-w-0">
          <legend className="mb-2 text-xs tracking-[.12em] text-white/45"><span className="mr-3 text-primary">02</span> ¿QUÉ QUIERES IMPULSAR?</legend>
          <p className="mb-4 text-xs leading-relaxed text-white/50">Elige una o varias opciones. No necesitas tenerlo todo resuelto.</p>
          <div className="flex flex-wrap gap-2">{contactServices.map((service, index) => {
            const selected = values.services.includes(service);
            return <label key={service} className="cursor-pointer"><input type="checkbox" name="services" value={service} checked={selected} aria-invalid={index === 0 && !!errors.services} aria-describedby={errors.services ? "services-error" : undefined} onChange={() => update("services", selected ? values.services.filter(item => item !== service) : [...values.services, service])} className="peer sr-only" /><span className={`flex items-center gap-2 rounded-full border px-4 py-3 text-xs transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-4 ${selected ? "border-primary bg-primary/10 text-primary" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}>{selected && <Check size={13} aria-hidden="true" />}{service}</span></label>;
          })}</div>
          {errors.services && <p id="services-error" className="mt-3 text-xs text-[#ffaba5]">{errors.services}</p>}
        </fieldset>
        <div>
          <p className="mb-5 text-xs tracking-[.12em] text-white/45"><span className="mr-3 text-primary">03</span> LA IDEA ES EL PUNTO DE PARTIDA</p>
          <Field id="idea" label="Cuéntanos qué tienes en mente" error={errors.idea}><textarea id="idea" name="idea" required minLength={20} maxLength={2000} rows={5} placeholder="Quiero lanzar una marca, mejorar mi sitio o llegar a más clientes… Cuéntanos tu objetivo y qué te gustaría cambiar." className="pv-contact-input resize-y" value={values.idea} onChange={event => update("idea", event.target.value)} onBlur={() => blur("idea")} {...attributes("idea")} /><p className="mt-2 text-right text-[10px] text-white/40">{values.idea.length} / 2,000</p></Field>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field id="budget" label="Inversión estimada" optional error={errors.budget}><select id="budget" name="budget" className="pv-contact-input" value={values.budget} onChange={event => update("budget", event.target.value)} {...attributes("budget")}>{contactBudgets.map(item => <option key={item}>{item}</option>)}</select></Field>
            <Field id="timeline" label="¿Cuándo empezamos?" optional error={errors.timeline}><select id="timeline" name="timeline" className="pv-contact-input" value={values.timeline} onChange={event => update("timeline", event.target.value)} {...attributes("timeline")}>{contactTimelines.map(item => <option key={item}>{item}</option>)}</select></Field>
          </div>
        </div>
        <div><label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/65"><input id="consent" name="consent" type="checkbox" required checked={values.consent} onChange={event => update("consent", event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#cfde00]" {...attributes("consent")} /><span>Acepto que Punto Visual me contacte sobre esta idea. Usaremos estos datos para conversar sobre tu proyecto.</span></label>{errors.consent && <p id="consent-error" className="mt-2 text-xs text-[#ffaba5]">{errors.consent}</p>}</div>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">{message && <p role="alert" className="mt-5 rounded-xl border border-[#ffaba5]/20 bg-[#ffaba5]/5 p-4 text-sm leading-relaxed text-[#ffaba5]">{message}</p>}</div>
      <button disabled={status === "sending"} type="submit" className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#e6f542] disabled:cursor-wait disabled:opacity-60">{status === "sending" ? <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" />Enviando tu idea…</> : <>Enviar mi idea <Send size={17} aria-hidden="true" /></>}</button>
      <p className="mt-3 text-center text-[10px] leading-relaxed text-white/40">Los campos con * son necesarios. No necesitas un brief perfecto para empezar.</p>
      {status === "error" && !Object.keys(validation.errors).length && <div className="mt-5 rounded-xl border border-white/10 p-4"><p className="mb-3 text-xs text-white/65">También puedes enviar esta misma idea desde tu correo.</p><div className="flex flex-wrap gap-3"><a href={emailLink} className="flex items-center gap-2 text-xs text-primary"><Mail size={15} aria-hidden="true" />Abrir mi correo</a><button type="button" onClick={copy} className="flex items-center gap-2 text-xs text-white/75"><Copy size={15} aria-hidden="true" />Copiar mensaje</button></div><p aria-live="polite" className="mt-3 text-xs text-white/60">{copyMessage}</p><details className="mt-3 text-xs text-white/60"><summary className="cursor-pointer">Ver resumen de mi idea</summary><pre className="mt-3 whitespace-pre-wrap break-words font-sans leading-relaxed">{contactMessage(validation.values)}</pre></details></div>}
      <noscript><p className="mt-4 text-sm text-white/70">Para usar el formulario activa JavaScript o escríbenos a <a href={`mailto:${contactEmail}`} className="text-primary">{contactEmail}</a>.</p></noscript>
    </form>
  );
}
