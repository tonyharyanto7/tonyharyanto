/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import config from "/CONFIG.json";

export default function ProfileSection() {
  const homeConfig = config.pages.home;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
      {homeConfig.profile_image && (
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
          <img
            src={homeConfig.profile_image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-xl text-center md:text-left">
        <h2 className="c-cursor-text text-2xl font-semibold mb-4">
          {homeConfig.about_me}
        </h2>
        <p className="c-cursor-text text-muted-foreground">
          {homeConfig.description}
        </p>
      </div>
    </div>
  );
}
