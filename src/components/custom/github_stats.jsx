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

const StatCard = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-black/30 backdrop-blur-[2px] p-4 md:p-6 rounded-lg shadow-md border border-primary/10 hover:shadow-xl transition-all duration-300 hover:border-primary/20"
    >
      <h3 className="text-lg md:text-xl font-bold mb-4 text-white c-cursor-text">
        {title}
      </h3>
      {children}
    </motion.div>
  );
};

const GitHubStats = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const { github_stats } = config.pages.home;

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

  if (!github_stats.enabled) return null;

  return (
    <div className="py-12" ref={ref}>
      <TypeAnimation
        sequence={[100, github_stats.title]}
        wrapper="p"
        className="text-3xl c-cursor-text font-bold text-center mb-12"
        cursor={false}
        speed={1}
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* GitHub Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <StatCard delay={0.6}>
            <div className="flex justify-center overflow-x-auto">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${github_stats.username}&theme=github-dark&bg_color=00000000&color=ffffff&line=ce6419&point=ce6419&area=true&hide_border=true`}
                alt="GitHub Activity Graph"
                className="w-full max-w-4xl rounded-lg"
                loading="lazy"
              />
            </div>
          </StatCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubStats;
