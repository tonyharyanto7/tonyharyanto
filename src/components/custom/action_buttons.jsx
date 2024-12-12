/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import Button from "./button";
import config from "/CONFIG.json";

export default function ActionButtons() {
  const homeConfig = config.pages.home;

  if (!homeConfig.action_buttons) return null;

  return (
    <div className="flex justify-center gap-4 mt-12">
      {homeConfig.action_buttons.map((button, index) => (
        <Button
          key={index}
          href={button.route}
          variant={button.style === "primary" ? "primary" : "secondary"}
          className="in-anim opacity-0 translate-y-10 transition-all duration-300 hover:scale-110 c-cursor-pointer"
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}
