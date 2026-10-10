# Punto Visual

Sitio de agencia de marketing digital y growth: branding, web, contenido e IA. Construido con Next.js App Router, React, TypeScript y Tailwind CSS 4.

## Desarrollo

```bash
npm ci
npm run dev
```

Abre http://localhost:3000. Para verificar el proyecto:

```bash
npm run lint
npm run build
npm start
```

## Editar y ampliar el sitio

- `src/data/site.ts`: menú compartido por header y footer, textos y especialidades del hero, correo de contacto y pasos del proceso.
- `src/components/sections/Hero.tsx`: estructura de la portada.
- `src/components/hero/GrowthOrbit.tsx`: visual orbital de marca, IA y growth.
- `src/components/HeroParticles.tsx`: partículas conectadas, con menor densidad en móvil.
- `src/components/sections/Services.tsx`: agrega servicios al arreglo `services` con icono, nombre y descripción.
- `src/data/projects.ts`: proyectos del portafolio y sus páginas individuales.
- `src/app/globals.css`: colores, tipografía, órbitas y estilos compartidos.

La navegación enlaza servicios y proceso dentro de la portada, y Contacto a `/contacto#contacto`. `SectionLink` y `SectionScroll`, en `src/components/navigation`, gestionan las anclas en la misma página y al cambiar de ruta, con scroll suave y foco accesible. El offset usa la altura de la barra del header más `--section-scroll-gap` (1rem), definida en `src/app/globals.css`. Para añadir una página, crea su ruta en `src/app` y agrega su enlace en `navigation`, dentro de `src/data/site.ts`.

## Contacto y accesibilidad

`/contacto` incluye un brief con nombre, correo, marca y teléfono opcionales, servicios, idea, inversión e inicio estimados y autorización de contacto. La validación se comparte entre navegador y servidor en `src/lib/contact.ts`.

El envío directo usa `POST /api/contact` y la API de Resend. Copia `.env.example` a `.env.local` y configura:

- `RESEND_API_KEY`: clave privada de Resend; se utiliza únicamente en el servidor.
- `CONTACT_FROM_EMAIL`: remitente de un dominio verificado, por ejemplo `Punto Visual <hola@tu-dominio-verificado.com>`.

El destinatario es `contactEmail` en `src/data/site.ts`. El correo del cliente se usa como `reply_to`, para responderle directamente. Reinicia el servidor de desarrollo después de configurar las variables; en producción agrega las mismas variables al alojamiento. Documentación: https://resend.com/docs/api-reference/emails/send-email.

Sin credenciales o ante un fallo del proveedor, el sitio conserva el mensaje y ofrece abrir el correo del cliente o copiar el brief. Solo muestra éxito cuando el proveedor acepta el envío; no verifica la entrega final en la bandeja de entrada.

Agrega tus perfiles reales de Instagram y Facebook en `socialLinks`, en `src/data/site.ts`. Los espacios aparecen como “Próximamente” hasta que agregues las URLs.

La ruta valida origen, formato y tamaño, incluye un campo contra bots y limita las ráfagas a cinco intentos por IP cada diez minutos, por instancia. Para un despliegue con varias instancias, complementa ese límite con almacenamiento compartido o controles del alojamiento y usa un proxy que establezca una IP fiable.

`npm run test:contact` verifica validaciones, envío simulado, errores del proveedor, configuración ausente y límites. No envía correos reales ni necesita claves.

El menú móvil admite teclado y cierre con Escape. El carrusel tiene control de pausa y se detiene al enfocarlo o arrastrarlo. Las animaciones respetan la preferencia de movimiento reducido y la portada conserva su contenido sin JavaScript.

El preloader global comparte el diseño orbital de la portada. Al abrir cualquier ruta espera la carga del documento y las fuentes, con un límite de 3,5 segundos desde el montaje. No simula porcentajes ni impone una espera mínima. `src/app/loading.tsx` muestra el mismo diseño mientras Next.js prepara una ruta; las páginas ya precargadas y el scroll entre secciones pueden abrirse directamente. Se oculta con JavaScript desactivado y respeta movimiento reducido. El formulario mantiene su indicador de envío independiente.

## Publicación

La configuración actual requiere un servidor compatible con Next.js para optimizar imágenes. Si se necesita exportación estática, adapta `next.config.ts` y la estrategia de imágenes al alojamiento elegido.

Actualiza el dominio en `src/app/layout.tsx`, `src/app/robots.ts` y `src/app/sitemap.ts` antes de publicar en otro dominio.
