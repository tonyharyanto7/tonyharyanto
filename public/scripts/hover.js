/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/maximjsx/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

(() => {
  const isDesktop = () => window.innerWidth > 768;

  const rawPrimary = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  const glowColor = hexToRGBA(rawPrimary, 0.2);

  document.addEventListener("mouseover", (e) => {
    if (!isDesktop()) return;
    const card = e.target.closest(".hover-card");
    if (card) bindCard(card);
  });

  function bindCard(card) {
    if (card._hoverBound) return;
    card._hoverBound = true;

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
  }

  function onEnter(e) {
    this._moveHandler = (ev) => {
      requestAnimationFrame(() => rotateToMouse(this, ev));
    };
    this.addEventListener("mousemove", this._moveHandler);
  }

  function onLeave(e) {
    if (this._moveHandler) {
      this.removeEventListener("mousemove", this._moveHandler);
      delete this._moveHandler;
    }
    resetCard(this);
  }

  function rotateToMouse(card, e) {
    const { x, y, width, height } = card.getBoundingClientRect();
    const offsetX = e.clientX - x - width * 0.5;
    const offsetY = e.clientY - y - height * 0.5;
    const dist = Math.hypot(offsetX, offsetY);

    const rotX = (offsetY / 100).toFixed(3);
    const rotY = -(offsetX / 100).toFixed(3);
    const rotAmt = (Math.log(dist) * 2).toFixed(2);

    card.style.transform = `
      perspective(600px)
      scale3d(1.01, 1.01, 1.01)
      rotate3d(${rotX}, ${rotY}, 0, ${rotAmt}deg)
    `;

    const glow = card.querySelector(".hover-glow");
    if (glow) {
      const cx = offsetX * 2 + width * 0.5;
      const cy = offsetY * 2 + height * 0.5;
      glow.style.backgroundImage = `
        radial-gradient(
          circle at ${cx}px ${cy}px,
          ${glowColor},
          rgba(0,0,0,0.06)
        )
      `;
    }
  }

  function resetCard(card) {
    card.style.transform = "";
    const glow = card.querySelector(".hover-glow");
    if (glow) glow.style.backgroundImage = "";
  }

  function hexToRGBA(hex, alpha = 1) {
    const [r, g, b] = hex
      .substring(1)
      .match(/.{2}/g)
      .map((h) => parseInt(h, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  }
})();
