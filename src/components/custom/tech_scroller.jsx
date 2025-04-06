/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
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
    <div className="w-full">
      <div className="grid place-content-center h-20">
        <Scroller
          items={homeConfig.languages}
          direction="left"
          speed="fast"
          className="max-w-xs"
          itemClasses="bg-white/30"
        />
      </div>

      <div className="grid place-content-center h-20">
        <Scroller
          items={homeConfig.tools}
          direction="right"
          speed="slow"
          className="max-w-lg"
          itemClasses="bg-white/10"
        />
      </div>
    </div>
  );
}
