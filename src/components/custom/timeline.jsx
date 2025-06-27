/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { motion } from "framer-motion";
import config from "/CONFIG.json";
import { useRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { parseText } from "@/lib/parse_links";

const TimelineItem = ({ experience, animationDelay, isInView }) => {
  const isLeft = experience.side === "left";

  return (
    <div
      className={`flex items-center w-full relative md:flex-row flex-col ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                transition: { delay: animationDelay + 1, duration: 0.6 },
              }
            : {}
        }
        className={`w-full md:w-1/2 z-20 relative ${
          isLeft ? "md:pr-8 md:text-left" : "md:pl-8 md:text-right"
        } mb-8 md:mb-0`}
      >
        <div className="group relative border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 p-4 md:p-6 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <p className="c-cursor-text text-sm font-normal text-gray-400 tracking-wide uppercase">
              {experience.date}
            </p>
            <h4 className="c-cursor-text text-base md:text-lg text-gray-300 mb-2">
              {parseText(experience.company)}
            </h4>
            <h3 className="c-cursor-text text-xl md:text-2xl font-bold mb-4 text-white g">
              {parseText(experience.title)}
            </h3>
            <p className="c-cursor-text text-gray-300 leading-relaxed">
              {parseText(experience.description)}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={
          isInView
            ? {
                width: "2rem",
                transition: { duration: 0.5, delay: animationDelay + 0.5 },
              }
            : {}
        }
        className={`absolute z-0 h-1 bg-gradient-to-r  hidden md:block ${
          !isLeft
            ? "left-1/2 from-violet-500 to-transparent"
            : "right-1/2 from-transparent to-violet-500"
        }`}
        style={{
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
        }}
      />
    </div>
  );
};

const Timeline = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className="py-12">
      <TypeAnimation
        sequence={[100, config.pages.home.experience.title]}
        wrapper="h2"
        className="text-4xl md:text-5xl c-cursor-text font-bold text-center mb-20 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        cursor={false}
        speed={1}
      />
      <div ref={ref} className="relative max-w-4xl mx-auto px-[1rem]">
        {isInView && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "calc(100% + 6.25rem)",
              transition: { duration: 2, delay: 0 },
            }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 rounded-full bg-gradient-to-b from-violet-500 to-violet-500 hidden md:block"
            style={{
              height: "calc(100% + 6.25rem)",
              top: "-3.125rem",
              boxShadow:
                "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)",
            }}
          />
        )}

        <div className="relative space-y-1">
          {config.pages.home.experience.list.map((experience, index) => (
            <TimelineItem
              key={index}
              experience={experience}
              animationDelay={index * 0.3}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
