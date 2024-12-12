/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button(
  {
    className,
    children,
    variant = "primary",
    hoverEffect = true,
    newTab = false,
    ...props
  },
  ref,
) {
  const variants = {
    primary: "text-white bg-primary hover:bg-primary",
    secondary:
      "text-white bg-secondary border border-secondary hover:bg-secondary",
  };

  const buttonClassName = cn(
    "c-cursor-pointer inline-block px-4 py-2 rounded-md transform transition-transform duration-300 ease-in-out",
    hoverEffect && "hover:scale-110",
    variants[variant],
    className,
  );

  const isInternalLink =
    typeof props.href === "string" && props.href.startsWith("/");

  if (isInternalLink && !newTab) {
    return (
      <Link href={props.href} passHref>
        <span ref={ref} className={buttonClassName} {...props}>
          {children}
        </span>
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      className={buttonClassName}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
