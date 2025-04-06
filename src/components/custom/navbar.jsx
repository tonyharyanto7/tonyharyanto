/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
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
import { motion, AnimatePresence } from "framer-motion";

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

  const enabledPages = Object.entries(config.pages).filter(
    ([, pageConfig]) => pageConfig.enabled,
  );

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "bg-black/40 py-2" : "bg-black/20 py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center items-center">
          {enabledPages.map(([pageName, pageConfig]) => {
            const isActive = pathname === pageConfig.route;
            return (
              <li key={pageName} className="mx-4 relative">
                <Link
                  href={pageConfig.route}
                  className={cn(
                    "block text-center font-medium transition-colors duration-300",
                    "text-white",
                    isActive ? "text-primary" : "hover:text-primary",
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
                      className="absolute bottom-0 left-0 right-0 bg-primary"
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
        <div className="md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="absolute top-2 right-4 flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          >
            <motion.span
              animate={
                isMobileMenuOpen ? { rotate: 45, translateY: 8 } : { rotate: 0 }
              }
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-white origin-center"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-white"
            />
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, translateY: -8 }
                  : { rotate: 0 }
              }
              transition={{ duration: 0.3 }}
              className="w-full h-0.5 bg-white origin-center"
            />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
                className="fixed inset-0 bg-black/80 flex flex-col justify-center items-center space-y-6 pt-16"
              >
                {enabledPages.map(([pageName, pageConfig]) => {
                  const isActive = pathname === pageConfig.route;
                  return (
                    <motion.li
                      key={pageName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay:
                          0.1 * enabledPages.indexOf([pageName, pageConfig]),
                      }}
                      className="w-full"
                    >
                      <Link
                        href={pageConfig.route}
                        className={cn(
                          "block text-center font-medium transition-colors duration-300 py-3",
                          "text-white",
                          isActive ? "text-primary" : "hover:text-primary",
                        )}
                      >
                        {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
