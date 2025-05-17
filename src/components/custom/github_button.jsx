/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

/**
Copyright (c) 2025 UI LAYOUT
https://github.com/ui-layouts/uilayouts
 */

"use client";
import React, { useState } from "react";
import { Github, Star } from "lucide-react";
import { Liquid } from "./liquid_gradient";
const COLORS = {
  color1: "#FFFFFF", 
  color2: "#D9B4F5", 
  color3: "#C89AD5", 
  color4: "#A87DC4", 
  color5: "#8E62B4", 
  color6: "#7556bf", 
  color7: "#9C57B7", 
  color8: "#B74C9C", 
  color9: "#C03A89", 
  color10: "#BD4F9E", 
  color11: "#D5649E", 
  color12: "#E076A0", 
  color13: "#F189A2", 
  color14: "#FFFFFF", 
  color15: "#FFFFFF", 
  color16: "#FFFFFF", 
  color17: "#FFFFFF", 
};

const GitHubButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="hover:scale-105 duration-150 transition-transform flex justify-center">
      <a
        href="https://github.com/maximjsx/portfolio"
        target="_blank"
        className="relative inline-block  sm:w-36 w-14 h-[2.7em] mx-auto group dark:bg-black bg-white dark:border-white border-black border-2 rounded-lg"
      >
        <div className="c-cursor-pointer absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
        <div className="c-cursor-pointer relative w-full h-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-lg bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? "blur-[3px]" : i === 3 ? "blur-[5px]" : "blur-[4px]"
              }`}
            ></span>
          ))}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
        </div>
        <button
          className="absolute inset-0 rounded-lg bg-transparent c-cursor-pointer"
          aria-label="Get Started"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="c-cursor-pointer flex  items-center justify-between px-4 gap-2  rounded-lg group-hover:text-yellow-400 text-white text-xl font-semibold tracking-wide whitespace-nowrap">
            <Star className="group-hover:fill-yellow-400 fill-white w-6 h-6 flex-shrink-0 sm:inline-block hidden" />
            <Github className="sm:hidden inline-block group-hover:fill-yellow-400 fill-white w-6 h-6 flex-shrink-0" />
            <span className="sm:inline-block hidden">Github</span>
          </span>
        </button>
      </a>
    </div>
  );
};
export default GitHubButton;
