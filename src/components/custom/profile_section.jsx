/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import config from "/CONFIG.json";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function ProfileSection() {
  const homeConfig = config.pages.home;

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {homeConfig.profile_image && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-2 ring-secondary/20"
          >
            <img
              src={homeConfig.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 text-center md:text-left"
        >
          <TypeAnimation
            sequence={[500, homeConfig.about_me]}
            wrapper="h2"
            className="c-cursor-text text-3xl font-bold"
            cursor={false}
            speed={50}
          />
          <TypeAnimation
            sequence={[1000, homeConfig.description]}
            wrapper="p"
            className="c-cursor-text text-xl w-80 text-muted-foreground"
            cursor={false}
            speed={50}
          />
        </motion.div>
      </div>
    </div>
  );
}
