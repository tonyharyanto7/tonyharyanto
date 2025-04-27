/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import config from "/CONFIG.json";
import ProfileSection from "@/components/custom/profile_section";
import TechScroller from "@/components/custom/tech_scroller";
import ScrollButton from "@/components/custom/scroll_button";
import Timeline from "@/components/custom/timeline";


function useExternalScript(src) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [src]);
}

export default function Home() {
  const {
    experience: { enabled },
  } = config.pages.home;

  const { scrollY } = useScroll();
  useExternalScript("/scripts/scroll.js");

  const SCROLL_RANGE = [0, 1500];
  const Y_RANGE = [0, 0];
  const layer1Movement = useSpring(
    useTransform(scrollY, SCROLL_RANGE, Y_RANGE),
    { stiffness: 100, damping: 22 },
  );

  return (
    <div className="overflow-x-hidden">
      <motion.div
        className="container mx-auto px-4 md:py-8 py-0"
        style={{ y: layer1Movement }}
      >
        {/* Hero & Intro Section */}
        <div className="max-w-7xl mx-auto pt-8 mb-16 flex flex-col items-center">
          <ProfileSection />
          <TechScroller className="mt-3" />
          <ScrollButton className="mt-4" />
        </div>

        {/* Experience Timeline */}
        {enabled && (
          <section
            id="tech-section"
            className="mb-8 md:mb-12 flex justify-center"
          >
            <div className="w-full max-w-7xl">
              <Timeline />
            </div>
          </section>
        )}
      </motion.div>
    </div>
  );
}
