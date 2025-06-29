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
import { useEffect, useState } from "react";

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const bgImage = config.global?.background_image || "/images/background.webp";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
      <Image
        src={bgImage}
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
        quality={85}
      />

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
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${config.global.colors["color-2"]}26, transparent 40%)`,
        }}
      />

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "18rem",
          height: "18rem",
          backgroundColor: `${config.global.colors["color-1"]}0D`,
          borderRadius: "50%",
          filter: "blur(48px)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "75%",
          right: "25%",
          width: "24rem",
          height: "24rem",
          backgroundColor: `${config.global.colors["color-1"]}0D`,
          borderRadius: "50%",
          filter: "blur(48px)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          animationDelay: "1000ms",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "16rem",
          height: "16rem",
          backgroundColor: `${config.global.colors["color-4"]}0D`,
          borderRadius: "50%",
          filter: "blur(48px)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          animationDelay: "500ms",
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
            mask: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)`,
            WebkitMask: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.3) 60%, transparent 100%)`,
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
            background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
