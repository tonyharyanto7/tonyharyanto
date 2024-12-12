/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import config from "/CONFIG.json";
import Scroller from "@/components/custom/scroller";

export default function TechScroller() {
  const homeConfig = config.pages.home;

  return (
    <div className="mt-12 text-center">
      <h2 className="c-cursor-text text-2xl font-semibold mb-6">
        {homeConfig.tools_languages_title}
      </h2>

      <div className="grid place-content-center h-20">
        <Scroller
          items={homeConfig.languages}
          direction="left"
          speed="fast"
          className="max-w-xs"
          itemClasses="bg-primary"
        />
      </div>

      <div className="grid place-content-center h-20">
        <Scroller
          items={homeConfig.tools}
          direction="right"
          speed="fast"
          className="max-w-lg"
        />
      </div>
    </div>
  );
}
