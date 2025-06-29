"use client";

import { useEffect } from "react";
import config from "/CONFIG.json";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const colors = config.global.colors || {};

    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, []);

  return <>{children}</>;
}
