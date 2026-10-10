// src/ui/feedback/sonner/Sonner.tsx

"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterComponentProps } from "./sonner.types";

// Solo para lo que NO se puede hacer con CSS vars de Sonner:
const SONNER_STYLES = `
  .toaster [data-sonner-toast][data-type="success"] { border-left-width: 3px !important; }
  .toaster [data-sonner-toast][data-type="error"]   { border-left-width: 3px !important; }
  .toaster [data-sonner-toast][data-type="warning"] { border-left-width: 3px !important; }
  .toaster [data-sonner-toast][data-type="info"]    { border-left-width: 3px !important; }

  .toaster [data-sonner-toast] [data-close-button] {
    background:   var(--popover) !important;
    color:        var(--popover-foreground) !important;
    border-color: var(--border)  !important;
    transition:   background 150ms ease, color 150ms ease !important;
  }
  .toaster [data-sonner-toast] [data-close-button]:hover {
    background: var(--muted)      !important;
    color:      var(--muted-foreground) !important;
  }

  .toaster [data-sonner-toast][data-type="success"] [data-close-button] {
    background:   color-mix(in oklch, var(--success)     10%, var(--popover)) !important;
    color:        color-mix(in oklch, var(--success)     80%, var(--popover-foreground)) !important;
    border-color: color-mix(in oklch, var(--success)     45%, transparent) !important;
  }
  .toaster [data-sonner-toast][data-type="success"] [data-close-button]:hover {
    background: color-mix(in oklch, var(--success) 20%, var(--popover)) !important;
  }

  .toaster [data-sonner-toast][data-type="error"] [data-close-button] {
    background:   color-mix(in oklch, var(--destructive) 10%, var(--popover)) !important;
    color:        color-mix(in oklch, var(--destructive) 80%, var(--popover-foreground)) !important;
    border-color: color-mix(in oklch, var(--destructive) 45%, transparent) !important;
  }
  .toaster [data-sonner-toast][data-type="error"] [data-close-button]:hover {
    background: color-mix(in oklch, var(--destructive) 20%, var(--popover)) !important;
  }

  .toaster [data-sonner-toast][data-type="warning"] [data-close-button] {
    background:   color-mix(in oklch, var(--warning)     10%, var(--popover)) !important;
    color:        color-mix(in oklch, var(--warning)     80%, var(--popover-foreground)) !important;
    border-color: color-mix(in oklch, var(--warning)     45%, transparent) !important;
  }
  .toaster [data-sonner-toast][data-type="warning"] [data-close-button]:hover {
    background: color-mix(in oklch, var(--warning) 20%, var(--popover)) !important;
  }

  .toaster [data-sonner-toast][data-type="info"] [data-close-button] {
    background:   color-mix(in oklch, var(--information) 10%, var(--popover)) !important; 
    color:        color-mix(in oklch, var(--information) 80%, var(--popover-foreground)) !important;
    border-color: color-mix(in oklch, var(--information) 45%, transparent) !important;
  }
  .toaster [data-sonner-toast][data-type="info"] [data-close-button]:hover {
    background: color-mix(in oklch, var(--information) 20%, var(--popover)) !important;
  }
`;

export const Toaster = ({ ...props }: ToasterComponentProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static CSS string, no user input */}
      <style dangerouslySetInnerHTML={{ __html: SONNER_STYLES }} />
      <Sonner
        closeButton
        richColors
        theme={resolvedTheme as ToasterComponentProps["theme"]}
        icons={{
          success: <CircleCheckIcon className="size-4" />,
          info: <InfoIcon className="size-4" />,
          warning: <TriangleAlertIcon className="size-4" />,
          error: <OctagonXIcon className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
        }}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast: "cn-toast",
          },
        }}
        style={
          {
            "--border-radius": "var(--radius)",

            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",

            "--success-bg": "var(--popover)",
            "--success-text": "var(--popover-foreground)",
            "--success-border": "color-mix(in oklch, var(--success) 55%, transparent)",

            "--error-bg": "var(--popover)",
            "--error-text": "var(--popover-foreground)",
            "--error-border": "color-mix(in oklch, var(--destructive) 55%, transparent)",

            "--warning-bg": "var(--popover)",
            "--warning-text": "var(--popover-foreground)",
            "--warning-border": "color-mix(in oklch, var(--warning) 55%, transparent)",

            "--info-bg": "var(--popover)",
            "--info-text": "var(--popover-foreground)",
            "--info-border": "color-mix(in oklch, var(--information) 55%, transparent)",
          } as CSSProperties
        }
        {...props}
      />
    </>
  );
};

export default Toaster;
