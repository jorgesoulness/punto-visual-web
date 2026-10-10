"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
function getSnapshot() { return window.matchMedia(query).matches; }
// El servidor y la primera hidratación comparten un estado seguro y estable.
function getServerSnapshot() { return true; }

export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
