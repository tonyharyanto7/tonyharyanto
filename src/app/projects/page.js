/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { Card } from "@/components/custom/card/card";
import { useState, useEffect, useMemo } from "react";
import config from "/CONFIG.json";
import { TextAnimate } from "@/components/magicui/text-animate";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function Projects() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const headerText = config.pages.projects.header;
  const cards = useMemo(() => config.cards, []);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = cards.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-[1px] border-2 border-white/5">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`c-cursor-pointer w-8 h-8 rounded-md transition-all duration-200 text-sm font-medium ${
                currentPage === page
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  const showPagination = totalPages > 1;

  return (
    <div className="container mx-auto px-4 py-4">
      <TextAnimate
        animation="blurInUp"
        by="character"
        duration={1}
        className="c-cursor-text text-4xl font-bold text-center uppercase mb-[2.5rem]"
      >
        {headerText}
      </TextAnimate>

      <div className="flex flex-wrap justify-center items-start gap-6 mb-[2.5rem]">
        {currentCards.map(
          (
            { title, description, imageSRC, buttonText, buttonURL, badges },
            index,
          ) => (
            <div
              key={title ?? startIndex + index}
              className={`opacity-0 ${
                isMounted ? "animate-pop_in backdrop-blur-[1px]" : ""
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: "forwards",
              }}
            >
              <Card
                title={title}
                description={description}
                imageSRC={imageSRC}
                buttonText={buttonText}
                buttonURL={buttonURL}
                badges={badges}
              />
            </div>
          ),
        )}
      </div>

      {showPagination && <PaginationControls />}
    </div>
  );
}
