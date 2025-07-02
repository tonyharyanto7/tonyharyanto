/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import React from "react";
import Link from "next/link";

const Footer = ({ config }) => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm shadow-xl text-white py-12">
      <div className="container mx-auto text-center">
        {config.footer && (
          <>
            {config.footer.links && (
              <div className="flex justify-center space-x-4 mt-[0.5rem] mb-[0.5rem]">
                {config.footer.links.map((link, index) => {
                  const isExternalLink =
                    link.url.startsWith("http://") ||
                    link.url.startsWith("https://") ||
                    link.url.startsWith("mailto:");

                  if (isExternalLink) {
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:brightness-150 duration-200 hover:-translate-y-0.5 c-cursor-pointer"
                      >
                        {link.label}
                      </a>
                    );
                  } else {
                    return (
                      <Link
                        key={index}
                        href={link.url}
                        className="text-primary hover:brightness-150 duration-200 hover:-translate-y-0.5 c-cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    );
                  }
                })}
              </div>
            )}
            <p className="c-cursor-text text-sm">{config.footer.text}</p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
