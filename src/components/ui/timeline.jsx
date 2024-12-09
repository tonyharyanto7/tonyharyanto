/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { motion } from "framer-motion";
import config from "/CONFIG.json";
import { useRef, useEffect, useState } from "react";

const TimelineItem = ({ experience, isInView }) => {
  const isLeft = experience.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }
      }
      transition={{ duration: 4 }}
      className={`flex items-center w-full ${
        isLeft ? "justify-start" : "justify-end"
      }`}
    >
      <div className={`w-1/2 ${isLeft ? "pr-8" : "pl-8"}`}>
        <div
          className={`
          bg-black/45 p-6 rounded-lg shadow-md border border-primary/10
          ${isLeft ? "text-right" : "text-left"}
          hover:shadow-xl transition-shadow duration-300
        `}
        >
          <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
          <h4 className="text-lg text-gray-600 mb-2">{experience.company}</h4>
          <p className="text-sm text-gray-500 mb-3">{experience.date}</p>
          <p className="text-gray-700">{experience.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-20">
        {config.pages.home.experience.title}
      </h2>
      <div ref={ref} className="relative max-w-4xl mx-auto">
        {isInView && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "calc(100% + 100px)" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 
            rounded-full bg-white"
            style={{
              height: "calc(100% + 100px)",
              top: "-50px",
              boxShadow: "0 0 20px var(--secondary)",
            }}
          />
        )}

        <div className="relative space-y-10">
          {config.pages.home.experience.list.map((experience, index) => (
            <TimelineItem
              key={index}
              experience={experience}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
