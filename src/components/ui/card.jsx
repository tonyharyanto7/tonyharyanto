/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import config from "/CONFIG.json";

const Card = React.forwardRef(
  (
    {
      className,
      title,
      description,
      buttonText,
      buttonURL,
      imageSRC = "/images/projects/placeholder.png",
      setHovered,
      allHovered = false,
      badges = [],
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCardHover = (hovered) => {
      setIsHovered(hovered);
      if (setHovered) {
        setHovered(hovered);
      }
    };

    useEffect(() => {
      if (imageSRC) {
        const handleImageLoad = () => {
          setLoaded(true);
        };

        const img = new Image();
        img.onload = handleImageLoad;
        img.src = imageSRC;
      }
    }, [imageSRC]);

    const cardClassName = cn(
      "rounded-xl border bg-card text-card-foreground shadow hover-card project-card",
      !isHovered && allHovered ? "blurred" : "",
      className
    );

    const imageStyle = {
      filter: loaded ? "none" : "blur(10px)",
      transition: "filter 1s ease",
    };

    return (
      <div
        ref={ref}
        className={cardClassName}
        style={{ width: "18rem" }}
        onMouseEnter={() => handleCardHover(true)}
        onMouseLeave={() => handleCardHover(false)}
        {...props}>
        {imageSRC && (
          <div className="shine column">
            <figure className="hover:before:animate-shine_anim">
              <div className="relative h-40">
                <span className="c-cursor-text absolute top-0 left-0 w-full h-full card-img-top rounded-t-xl bg-gradient-to-br from-gray-800 to-pink-400 flex items-center justify-center text-white text-lg z-1">
                  {title}
                </span>
                {loaded && (
                  <img
                    src={imageSRC}
                    loading="lazy"
                    className={cn(
                      "absolute top-0 left-0 w-full h-full card-img-top rounded-t-xl z-2 transition-filter duration-1000 ease",
                      loaded ? "filter-none animate-move_in" : "filter blur-sm"
                    )}
                    style={imageStyle}
                    alt="banner"
                  />
                )}
              </div>
            </figure>
          </div>
        )}

        <div className="p-6">
          <div className="card-badges mb-2">
            {badges.map((badge, index) => (
              <img
                key={index}
                src={badge}
                alt="badge"
                className="mr-2 inline-block"
              />
            ))}
          </div>

          {title && (
            <h5 className="c-cursor-text text-xl font-semibold mb-2">
              {title}
            </h5>
          )}

          {description && (
            <p className="c-cursor-text text-muted-foreground mb-4">
              {description}
            </p>
          )}

          <div className="glow absolute inset-0 pointer-events-none"></div>

          {buttonText && buttonURL && (
            <a
              href={buttonURL}
              target="_blank"
              rel="noopener noreferrer"
              className="c-cursor-pointer btn btn-primary primary-button card-button inline-block rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
              {buttonText}
            </a>
          )}
        </div>
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card };
