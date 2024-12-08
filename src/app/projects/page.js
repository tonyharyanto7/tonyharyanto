"use client";

import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import config from "/CONFIG.json";

export default function Projects() {
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const hasMounted = useRef(false);

  const handleCardHover = (hovered) => {
    setIsHovered(hovered);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      config.cards.forEach((card, index) => {
        setTimeout(() => {
          setVisibleCards((prevCards) => [...prevCards, card]);
        }, index * 100);
      });
    }

    return () => {};
  }, []);

  return (
    <>
      <h1 className="c-cursor-text text-2xl font-bold text-center mb-5">
        {config.pages.projects.header}
      </h1>

      <div className="cards-container">
        {visibleCards.map((card, index) => (
          <Card
            className="animate-pop_in"
            key={index}
            title={card.title}
            description={card.description}
            imageSRC={card.imageSRC}
            buttonText={card.buttonText}
            buttonURL={card.buttonURL}
            setHovered={handleCardHover}
            allHovered={isHovered}
            badges={card.badges}
          />
        ))}
      </div>
    </>
  );
}
