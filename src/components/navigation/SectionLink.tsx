"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

// Mantiene los enlaces reales y las pestañas nuevas; controla solo anclas internas.
export default function SectionLink({ href, onClick, scroll, ...props }: Props) {
  const router = useRouter();
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (props.target && props.target !== "_self") || props.download) return;
    onClick?.(event);
    if (event.defaultPrevented) return;
    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin || !destination.hash) return;
    event.preventDefault();
    if (destination.pathname === window.location.pathname) {
      if (destination.href !== window.location.href) window.history.pushState(null, "", destination.pathname + destination.search + destination.hash);
      window.dispatchEvent(new Event("pv:section-navigation"));
    } else {
      router.push(destination.pathname + destination.search + destination.hash, { scroll: false });
    }
  }
  return <Link {...props} href={href} onClick={navigate} scroll={href.includes("#") ? false : scroll} />;
}
