/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import React from "react";
import GitHubButton from "./github_button";

const Footer = ({ config }) => {
  return (
    <footer className="bg-black/40 shadow-xl backdrop-blur-[2px] text-white py-12">
      <div className="container mx-auto text-center">
        {config.footer && (
          <>
            {config.footer.links && (
              <div className="flex justify-center space-x-4 mt-[0.5rem] mb-[0.5rem]">
                {config.footer.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:brightness-150 duration-200 hover:-translate-y-0.5 c-cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
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
