/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useEffect, useState } from "react";
import config from "/CONFIG.json";
import Timeline from "@/components/custom/timeline";
import ProfileSection from "@/components/custom/profile_section";
import TechScroller from "@/components/custom/tech_scroller";
import ScrollButton from "@/components/custom/scroll_button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Background from "@/components/custom/parallax";

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
  const { scrollY } = useScroll();

  useScript("scripts/scroll.js");

  const layer1Movement = useSpring(useTransform(scrollY, [0, 1500], [0, 0]), {
    stiffness: 100,
    damping: 22,
  });

  return (
    <>
      <Background />
      <motion.div
        className="container mx-auto px-4 py-4"
        style={{ y: layer1Movement }}
      >
        {/* Profile */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] pt-16">
          <div className="w-full max-w-7xl">
            <ProfileSection />
            <div className="mt-3">
              <TechScroller />
            </div>
            <div className="flex justify-center mt-4">
              <ScrollButton />
            </div>
          </div>
        </div>

        <div
          id="tech-section"
          className="min-h-[80vh] flex items-start mt-8 md:mt-12"
        >
          <div className="w-full max-w-7xl mx-auto">
            {homeConfig.experience.enabled && <Timeline />}
          </div>
        </div>
      </motion.div>
    </>
  );
}
