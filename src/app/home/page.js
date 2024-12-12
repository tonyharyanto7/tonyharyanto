/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useEffect } from "react";
import config from "/CONFIG.json";
import Timeline from "@/components/custom/timeline";
import ProfileSection from "@/components/custom/profile_section";
import TechScroller from "@/components/custom/tech_scroller";
import ActionButtons from "@/components/custom/action_buttons";

function useScript(url) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
}

export default function Home() {
  const homeConfig = config.pages.home;

  useScript("scripts/scroll.js");

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="c-cursor-text text-4xl glow font-bold text-center mb-10">
        {homeConfig.header}
      </h1>

      <ProfileSection />
      <TechScroller />
      <ActionButtons />

      <div className="container mx-auto px-4 py-8">
        {homeConfig.experience.enabled && <Timeline />}
      </div>
    </div>
  );
}
