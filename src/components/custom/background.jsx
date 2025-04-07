/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import Image from "next/image";
import config from "/CONFIG.json";

export default function Background() {
  const bgImage =
    config.global?.background_image || "/images/parallax/layer_4.webp";

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <Image
        src={bgImage}
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
        quality={85}
      />
    </div>
  );
}