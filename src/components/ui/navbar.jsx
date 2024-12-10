/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "/CONFIG.json";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "p-4 sticky top-0 backdrop-blur-sm transition-all duration-200 ease-in-out",
        isScrolled ? "shadow-xl text-base" : "text-sm",
        "z-50",
      )}
    >
      <ul className="flex justify-center items-center space-x-4">
        {Object.entries(config.pages)
          .filter(([_, pageConfig]) => pageConfig.enabled)
          .map(([pageName, pageConfig]) => {
            const isActive = pathname === pageConfig.route;

            return (
              <li key={pageName}>
                <Link
                  href={pageConfig.route}
                  className={cn(
                    "c-cursor-pointer px-4 py-2 rounded-md border border-transparent transition-all duration-500 ease-in-out",
                    "text-white font-medium",
                    isActive
                      ? "hover:bg-gray-700 shadow-md hover:border-white opacity-50 border-gray-700"
                      : "hover:border-white active:bg-secondary hover:shadow-2xl",
                  )}
                >
                  {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
