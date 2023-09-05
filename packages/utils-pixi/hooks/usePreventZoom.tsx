'use client'

import { useEffect } from "react";

export default function usePreventZoom() {
  /* Prevent zooming */
  useEffect(() => {
    window.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
  }, []);
}
