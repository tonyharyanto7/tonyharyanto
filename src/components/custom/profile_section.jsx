/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import config from "/CONFIG.json";
import ActionButtons from "./action_buttons";
import { LinkPreview } from "@/components/ui/link-preview";
import { parseText } from "@/lib/parse_links";

function parseAboutMe(text, gradientColors) {
  const [start, end] = gradientColors;
  return text.split("~~~").map((segment, idx) => {
    if (idx % 2 === 1) {
      return (
        <span
          key={idx}
          style={{
            background: `linear-gradient(to right, ${start}, ${end})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {segment}
        </span>
      );
    }
    return segment;
  });
}

export default function ProfileSection() {
  const {
    about_me,
    description,
    gradient,
    profile_image: imageSrc,
  } = config.pages.home;

  const aboutMeNodes = parseText(about_me);
  const descriptionNodes = useMemo(() => parseText(description), [description]);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="flex flex-col md:flex-row items-center lg:gap-8 gap-5 md:gap-16">
        {imageSrc && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative aspect-[5/7] w-32 md:w-60"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent overflow-hidden">
              <Image
                src={imageSrc}
                alt="Profile"
                fill
                sizes="100vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 text-center md:text-left"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="c-cursor-text text-4xl md:text-5xl font-bold"
          >
            {aboutMeNodes}
          </motion.h2>

          <div className="c-cursor-text text-lg md:text-xl w-full md:max-w-[27rem] text-muted-foreground">
            {descriptionNodes}
          </div>

          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <ActionButtons />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
