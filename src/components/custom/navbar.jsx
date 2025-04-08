/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/maximjsx/portfolio)
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
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const enabledPages = Object.entries(config.pages).filter(
    ([, pageConfig]) => pageConfig.enabled,
  );

  return (
    <nav
      className={cn(
        "z-50 sticky top-0 transition-all duration-300",
        "md:backdrop-blur-[2px]",
        isScrolled ? "md:bg-black/40 md:py-5" : "md:bg-black/10 md:py-5",
        "bg-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-[1rem] relative">
        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center items-center">
          {enabledPages.map(([pageName, pageConfig]) => {
            const isActive = pathname === pageConfig.route;
            return (
              <li key={pageName} className="mx-4 relative">
                <Link
                  href={pageConfig.route}
                  className={cn(
                    "c-cursor-pointer block text-center font-medium transition-colors duration-300",
                    "text-white",
                    isActive
                      ? "text-secondary brightness-150"
                      : "hover:text-secondary",
                  )}
                >
                  <motion.span
                    initial={false}
                    animate={{ y: isActive ? -3 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ display: "inline-block" }}
                  >
                    {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      initial={false}
                      className="absolute bottom-0 left-0 right-0 bg-secondary"
                      style={{ height: "2px" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="fixed top-4 right-4 z-50 rounded-lg bg-black/30 backdrop-blur-[2px] p-2">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 z-60"
            >
              <span
                className={cn(
                  "w-full h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2"
                    : "rotate-0 translate-y-0",
                )}
              />
              <span
                className={cn(
                  "w-full h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "w-full h-0.5 bg-white transition-all duration-300",
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2"
                    : "rotate-0 translate-y-0",
                )}
              />
            </button>
          </div>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/90"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="relative flex flex-col justify-center items-center h-full">
                <ul className="space-y-6">
                  {enabledPages.map(([pageName, pageConfig]) => {
                    const isActive = pathname === pageConfig.route;
                    return (
                      <li key={pageName} className="w-60">
                        <Link
                          href={pageConfig.route}
                          className={cn(
                            "c-cursor-pointer px-4 py-2 rounded-md border border-transparent transition-all duration-500 ease-in-out",
                            "text-white font-medium block text-center",
                            "w-60 mb-2 text-lg border-white hover:bg-gray-700",
                            isActive
                              ? "hover:bg-gray-700 hover:border-white opacity-50 border-gray-700"
                              : "",
                          )}
                        >
                          {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
