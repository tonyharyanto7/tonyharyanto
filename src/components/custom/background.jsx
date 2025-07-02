/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import Image from "next/image";
import config from "/CONFIG.json";
import { useEffect, useState, useRef } from "react";

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothMousePosition, setSmoothMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);

  const animationFrameRef = useRef();
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const targetScrollRef = useRef(0);
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const currentScrollRef = useRef(0);

  const bgImage = config.global?.background_image || "/images/background.webp";
  const bgImageSecondary =
    config.global?.background_image_secondary ||
    "/images/background-small.webp";

  /*Interpolation*/ 

  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };


  useEffect(() => {
    const animate = () => {
      const lerpFactor = 0.1;

      currentMouseRef.current.x = lerp(
        currentMouseRef.current.x,
        targetMouseRef.current.x,
        lerpFactor,
      );
      currentMouseRef.current.y = lerp(
        currentMouseRef.current.y,
        targetMouseRef.current.y,
        lerpFactor,
      );

      currentScrollRef.current = lerp(
        currentScrollRef.current,
        targetScrollRef.current,
        lerpFactor * 1.5, 
      );

      setSmoothMousePosition({
        x: currentMouseRef.current.x,
        y: currentMouseRef.current.y,
      });
      setSmoothScrollY(currentScrollRef.current);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset1 = -smoothScrollY * 0.3; 
  const parallaxOffset2 = -smoothScrollY * 0.15;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        overflow: "hidden",
      }}
    >
      {/* Secondary background layer  */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "200%", 
          transform: `translateY(${parallaxOffset2}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src={bgImageSecondary}
          alt="Background Secondary"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          aria-hidden="true"
          quality={85}
          style={{
            opacity: 0.5, 
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "100%",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={bgImageSecondary}
            alt="Background Secondary Duplicate"
            fill
            sizes="100vw"
            className="object-cover object-top"
            aria-hidden="true"
            quality={85}
            style={{
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* Main background layer */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "200%", 
          transform: `translateY(${parallaxOffset1}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src={bgImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          aria-hidden="true"
          quality={95}
        />
        {/* Duplicate bg */}
        <div
          style={{
            position: "absolute",
            top: "100%",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={bgImage}
            alt="Background Duplicate"
            fill
            sizes="100vw"
            className="object-cover object-top"
            aria-hidden="true"
            quality={95}
          />
        </div>
      </div>

      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom right, ${config.global.colors["color-1"]}10, ${config.global.colors["color-1"]}15, ${config.global.colors["color-1"]}10)`,
        }}
      />

      {/* Mouse follow gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "opacity 300ms",
          opacity: isHovering ? 0.3 : 0.2,
          background: `radial-gradient(600px circle at ${smoothMousePosition.x}px ${smoothMousePosition.y}px, ${config.global.colors["color-2"]}26, transparent 40%)`,
        }}
      />



      {/* Grid pattern */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          transition: "opacity 300ms",
          opacity: isHovering ? 0.4 : 0.2,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(${config.global.colors["color-1"]}26 1px, transparent 1px),
            linear-gradient(90deg, ${config.global.colors["color-1"]}26 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Flashlight grid effect */}
      {isHovering && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            transition: "opacity 200ms",
            mask: `radial-gradient(250px circle at ${smoothMousePosition.x}px ${smoothMousePosition.y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)`,
            WebkitMask: `radial-gradient(250px circle at ${smoothMousePosition.x}px ${smoothMousePosition.y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.4,
              backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      )}

      {/* Additional spotlight effect */}
      {isHovering && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            transition: "opacity 200ms",
            background: `radial-gradient(200px circle at ${smoothMousePosition.x}px ${smoothMousePosition.y}px, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
