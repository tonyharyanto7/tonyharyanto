/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import { Card } from "@/components/custom/card/card";
import { useState, useEffect, useRef } from "react";
import config from "/CONFIG.json";

export default function Projects() {
  const [visibleCards, setVisibleCards] = useState([]);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      config.cards.forEach((card, index) => {
        if (config.card.pop_in) {
          setTimeout(() => {
            setVisibleCards((prevCards) => [...prevCards, card]);
          }, index * 200);
        } else {
          setVisibleCards((prevCards) => [...prevCards, card]);
        }
      });
    }

    return () => {};
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="c-cursor-text text-4xl font-bold text-center uppercase glow mb-10">
        {config.pages.projects.header}
      </h1>

      <div className="flex flex-wrap justify-center items-start gap-5 mb-10">
        {visibleCards.map((card, index) => (
          <Card
            className={config.card.pop_in ? "animate-pop_in" : ""}
            key={index}
            title={card.title}
            description={card.description}
            imageSRC={card.imageSRC}
            buttonText={card.buttonText}
            buttonURL={card.buttonURL}
            badges={card.badges}
          />
        ))}
      </div>
    </div>
  );
}
