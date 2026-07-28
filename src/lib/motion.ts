"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

export const SCROLLER_ID = "scene-scroller";

let initialized = false;

export function ensureGsap() {
  if (initialized) return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("sealEase", "0.16, 1, 0.3, 1");
  CustomEase.create("inkEase", "0.22, 1, 0.36, 1");
  initialized = true;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
