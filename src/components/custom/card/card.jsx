/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { CardImage } from "@/components/custom/card/card_image";
import { CardBadges } from "@/components/custom/card/card_badges";

const Card = React.forwardRef(
  (
    {
      className,
      title,
      description,
      buttonText,
      buttonURL,
      imageSRC = "/images/projects/placeholder.png",
      badges = [],
      ...props
    },
    ref,
  ) => {
    const cardClassName = cn(
      "rounded-xl border bg-card text-card-foreground shadow hover-card project-card",
      className,
    );

    return (
      <div
        ref={ref}
        className={cardClassName}
        style={{ width: "18rem" }}
        {...props}
      >
        {imageSRC && <CardImage imageSRC={imageSRC} title={title} />}

        <div className="p-6">
          <CardBadges badges={badges} />

          {title && (
            <h5 className="c-cursor-text text-xl font-semibold mb-2">
              {title}
            </h5>
          )}

          {description && (
            <p className="c-cursor-text text-muted-foreground mb-4">
              {description}
            </p>
          )}

          <div className="glow absolute inset-0 pointer-events-none"></div>

          {buttonText && buttonURL && (
            <a
              href={buttonURL}
              target="_blank"
              rel="noopener noreferrer"
              className="c-cursor-pointer btn btn-primary primary-button card-button inline-block rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card };
