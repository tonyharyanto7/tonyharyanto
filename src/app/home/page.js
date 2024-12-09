/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
import config from "/CONFIG.json";
export default function Home() {
  return (
    <h1 className="c-cursor-text text-2xl font-bold text-center mb-5">
      {config.pages.home.header}
    </h1>
  );
}
