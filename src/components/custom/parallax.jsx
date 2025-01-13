import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const layer1Movement = useTransform(scrollY, [0, 1500], [0, -1500]);
  const layer2Movement = useTransform(scrollY, [0, 1500], [0, -1200]);
  const layer3Movement = useTransform(scrollY, [0, 1500], [0, -900]);
  const middleMovement = useTransform(scrollY, [0, 1500], [0, -1500]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          backgroundImage: "url(/images/parallax/layer_4.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -4,
        }}
      />

      {!isMobile && (
        <>
          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_3.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "110vh",
              y: layer3Movement,
              zIndex: -3,
            }}
          />

          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_2.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "110vh",
              y: layer2Movement,
              zIndex: -2,
            }}
          />

          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_1.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "120vh",
              y: layer1Movement,
              zIndex: -1,
            }}
          />

          <motion.div
            className="absolute top-[120vh] w-full"
            style={{
              backgroundImage: "url(/images/parallax/middle.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "140vh",
              y: middleMovement,
              zIndex: -1,
            }}
          />

          <motion.div
            className="absolute top-[220vh] w-full"
            style={{
              backgroundImage: "url(/images/parallax/middle.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "140vh",
              y: middleMovement,
              zIndex: -1,
            }}
          />
        </>
      )}
    </div>
  );
}
