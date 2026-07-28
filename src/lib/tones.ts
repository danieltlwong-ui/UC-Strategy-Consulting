import type { CSSProperties } from "react";

export type Tone = "dark" | "paper" | "mist" | "frost";

function lightTone(ground: string, surface: string, surface2: string): CSSProperties {
  return {
    "--ground": ground,
    "--surface": surface,
    "--surface-2": surface2,
    "--surface-3": surface2,
    "--ink": "#10192c",
    "--ink-muted": "#4c5b76",
    "--ink-faint": "#8493ab",
    "--brass": "#9c7b1c",
    "--brass-soft": "rgba(156, 123, 28, 0.28)",
    "--brass-rule": "rgba(11, 21, 38, 0.12)",
    "--brass-rule-strong": "rgba(11, 21, 38, 0.28)",
    "--gold": "#b8860b",
    "--steel": "#2f6690",
    "--steel-soft": "rgba(47, 102, 144, 0.22)",
    "--sky": "#1f4d70",
    "--denim": "#16324a",
  } as CSSProperties;
}

export const tones: Record<Tone, CSSProperties> = {
  dark: {},
  paper: lightTone("#ffffff", "#f7f9fc", "#eef1f6"),
  mist: lightTone("#eef1f5", "#ffffff", "#e6eaf0"),
  frost: lightTone("#e6edf6", "#ffffff", "#dbe5f1"),
};
