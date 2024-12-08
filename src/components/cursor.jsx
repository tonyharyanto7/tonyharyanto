"use client";

import { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState("default");
  const [isHovering, setIsHovering] = useState(false);
  const [cursorSize, setCursorSize] = useState(10);
  const [isInitialized, setIsInitialized] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const observerRef = useRef(null);

  const cursorMap = {
    default: "/cursor/normal.png",
    pointer: "/cursor/pointer.png",
    text: "/cursor/text.png",
  };

  const cursorClasses = {
    "c-cursor-pointer": "pointer",
    "c-cursor-text": "text",
    "c-cursor-custom": "custom",
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      const currentTime = Date.now();

      if (!isInitialized) {
        setIsInitialized(true);
        setCursorSize(54);
      }

      const deltaX = newPosition.x - lastPositionRef.current.x;
      const deltaY = newPosition.y - lastPositionRef.current.y;
      const deltaTime = currentTime - lastTimeRef.current;

      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      const baseSize = 40;
      const maxSize = 400;
      const minSize = 30;
      const speedMultiplier = 10;

      const newSize = Math.max(
        minSize,
        Math.min(
          maxSize,
          baseSize + Math.min(speed * speedMultiplier, maxSize - baseSize)
        )
      );

      setCursorSize(newSize);

      mousePositionRef.current = newPosition;
      lastPositionRef.current = newPosition;
      lastTimeRef.current = currentTime;

      setPosition(newPosition);
    };

    const addDynamicCursorListeners = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" || mutation.type === "attributes") {
            const allElements = document.querySelectorAll("*");

            allElements.forEach((el) => {
              const cursorClass = Object.keys(cursorClasses).find((cls) =>
                el.classList.contains(cls)
              );

              if (cursorClass) {
                const handleEnter = () => {
                  setCursorType(cursorClasses[cursorClass]);
                  setIsHovering(true);
                };

                const handleLeave = () => {
                  setCursorType("default");
                  setIsHovering(true);

                  setTimeout(() => {
                    setIsHovering(false);
                  }, 400);
                };

                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);

                el.addEventListener("mouseenter", handleEnter);
                el.addEventListener("mouseleave", handleLeave);
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });

      observerRef.current = observer;
    };

    if (typeof window !== "undefined") {
      const initialPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      mousePositionRef.current = initialPosition;
      lastPositionRef.current = initialPosition;
      setPosition(initialPosition);

      document.body.style.cursor = "none";
      document.addEventListener("mousemove", handleMouseMove);

      addDynamicCursorListeners();
    }

    return () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const cursorStyle = {
    position: "fixed",
    width: isInitialized ? `${cursorSize}px` : `0`,
    height: isInitialized ? `${cursorSize}px` : `0`,
    pointerEvents: "none",
    zIndex: 9999,
    transform: `translate(${position.x - cursorSize / 2}px, ${
      position.y - cursorSize / 2
    }px)`,
    backgroundImage: `url(${cursorMap[cursorType]})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition: "all 0.07s ease-out",
    animation: isHovering ? "cursorBounce 0.4s ease" : "none",
  };

  const keyframes = `
    @keyframes cursorBounce {
      0%, 100% { 
        transform: translate(${position.x - cursorSize / 2}px, ${
    position.y - cursorSize / 2
  }px) scale(1); 
      }
      50% { 
        transform: translate(${position.x - cursorSize / 2}px, ${
    position.y - cursorSize / 2
  }px) scale(1.3) rotate(5deg); 
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={cursorStyle} />
    </>
  );
};

export default CustomCursor;
