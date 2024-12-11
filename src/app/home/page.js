/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import Timeline from "@/components/custom/timeline";
import config from "/CONFIG.json";
import Link from "next/link";

import { useEffect } from "react";
import Scroller from "@/components/custom/scroller";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="c-cursor-text text-3xl font-bold text-center mb-8">
        {homeConfig.header}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {homeConfig.profile_image && (
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
            <img
              src={homeConfig.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-xl text-center md:text-left">
          <h2 className="c-cursor-text text-2xl font-semibold mb-4">
            {homeConfig.about_me}
          </h2>
          <p className="c-cursor-text text-muted-foreground">
            {homeConfig.description}
          </p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="c-cursor-text text-2xl font-semibold mb-6">
          {homeConfig.tools_languages_title}
        </h2>

        <div className="grid place-content-center">
          <Scroller
            items={homeConfig.languages}
            direction="left"
            speed="fast"
            className="max-w-xs"
            itemClasses="bg-primary"
          />
        </div>

        <div className="grid place-content-center">
          <Scroller
            items={homeConfig.tools}
            direction="right"
            speed="fast"
            className="max-w-lg"
          />
        </div>
      </div>

      {homeConfig.action_buttons && (
        <div className="flex justify-center gap-4 mt-12">
          {homeConfig.action_buttons.map((button, index) => (
            <Link
              key={index}
              href={button.route}
              className={`
                px-6 py-3 rounded-lg in-anim opacity-0 translate-y-10 transition-all duration-300
                ${
                  button.style === "primary"
                    ? "hover:scale-110 c-cursor-pointer bg-primary text-primary-foreground"
                    : "hover:scale-110 c-cursor-pointer bg-secondary text-secondary-foreground"
                }
              `}
            >
              {button.label}
            </Link>
          ))}
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {homeConfig.experience.enabled && <Timeline />}
      </div>
    </div>
  );
}
