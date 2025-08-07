/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { parseText } from "@/lib/parse_links";
import config from "/CONFIG.json";

export default function Privacy() {
  const privacy = config.pages.privacy;

  const generateAnchorId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const scrollToSection = (sectionTitle) => {
    const anchorId = generateAnchorId(sectionTitle);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getIndentLevel = (text) => {
    const dashIndex = text.indexOf("-");
    if (dashIndex === -1) return 0;
    return dashIndex;
  };

  const renderDetail = (detail, detailIndex, indentLevel = 0) => {
    if (detail.trim().startsWith("-")) {
      const content = detail.replace(/^\s*-\s*/, "");

      const listStyleClass = indentLevel === 0 ? "list-disc" : "list-[circle]";
      const marginClass =
        indentLevel > 0 ? `ml-${Math.min(indentLevel * 2, 8)}` : "";

      return (
        <li
          key={detailIndex}
          className={`c-cursor-text text-gray-400 ${listStyleClass} ${marginClass}`}
          style={{
            marginLeft: indentLevel > 0 ? `${indentLevel * 20}px` : "0",
          }}
        >
          {parseText(content)}
        </li>
      );
    } else {
      return (
        <p
          key={detailIndex}
          className="c-cursor-text mb-[0.5rem] text-gray-300"
        >
          {parseText(detail)}
        </p>
      );
    }
  };

  const renderDetails = (details) => {
    const rendered = [];
    let currentList = [];
    let currentListIndent = 0;

    details.forEach((detail, index) => {
      if (detail.trim().startsWith("-")) {
        const indentLevel = getIndentLevel(detail);
        currentList.push({ detail, index, indentLevel });
        currentListIndent = Math.max(currentListIndent, indentLevel);
      } else {
        if (currentList.length > 0) {
          rendered.push(
            <ul
              key={`list-${currentList[0].index}`}
              className="list-inside space-y-2 mb-[0.5rem]"
            >
              {currentList.map(({ detail, index, indentLevel }) => {
                const content = detail.replace(/^\s*-\s*/, "");
                const isNested = indentLevel > 0;

                return (
                  <li
                    key={index}
                    className={`c-cursor-text text-gray-400 ${
                      isNested ? "list-[circle]" : "list-disc"
                    }`}
                    style={{
                      marginLeft: isNested ? `${indentLevel * 20}px` : "0",
                      listStyleType: isNested ? "circle" : "disc",
                    }}
                  >
                    {parseText(content)}
                  </li>
                );
              })}
            </ul>,
          );
          currentList = [];
          currentListIndent = 0;
        }

        rendered.push(renderDetail(detail, index));
      }
    });

    if (currentList.length > 0) {
      rendered.push(
        <ul
          key={`list-${currentList[0].index}`}
          className="list-inside space-y-2"
        >
          {currentList.map(({ detail, index, indentLevel }) => {
            const content = detail.replace(/^\s*-\s*/, "");
            const isNested = indentLevel > 0;

            return (
              <li
                key={index}
                className={`c-cursor-text text-gray-400`}
                style={{
                  marginLeft: isNested ? `${indentLevel * 20}px` : "0",
                  listStyleType: isNested ? "circle" : "disc",
                }}
              >
                {parseText(content)}
              </li>
            );
          })}
        </ul>,
      );
    }

    return rendered;
  };

  return (
    <div className="container mx-auto px-[1rem] py-[1rem] max-w-5xl">
      <h1 className="c-cursor-text text-4xl uppercase font-bold text-center mb-[2.5rem]">
        {privacy.header}
      </h1>

      <div className="bg-white/5 backdrop-blur-[1px] rounded-lg p-8 space-y-6 border-2 border-white/5">
        {privacy.updated && (
          <p className="text-sm text-gray-300 text-center mt-4">
            {privacy.updated}
          </p>
        )}

        <p className="mb-[1.5rem]">{parseText(privacy.content.introduction)}</p>

        {privacy.content.tableOfContents && (
          <div className="mb-[2rem] p-6 bg-white/3 rounded-lg border border-white/10">
            <h2 className="text-2xl c-cursor-text font-semibold mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {privacy.content.tableOfContents.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="c-cursor-pointer text-left hover:text-primary transition-colors duration-200 underline"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {privacy.content.sections.map((section, index) => (
          <div
            key={index}
            id={generateAnchorId(section.title)}
            className="mb-[1.5rem] scroll-mt-20"
          >
            <h2 className="text-2xl c-cursor-text font-semibold mb-[1rem]">
              {section.title}
            </h2>
            <p className="c-cursor-text mb-[0.5rem]">
              {parseText(section.description)}
            </p>
            {section.details && (
              <div className="space-y-2">{renderDetails(section.details)}</div>
            )}
          </div>
        ))}

        <div className="mt-[2rem] pt-[1rem] border-t border-gray-700">
          <h3 className="c-cursor-text text-xl font-semibold mb-4">
            {privacy.content.contact_title}
          </h3>
          <p className="c-cursor-text">{parseText(privacy.content.contact)}</p>
        </div>
      </div>
    </div>
  );
}
