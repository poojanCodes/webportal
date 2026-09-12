"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PageWrapper({ children }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const revealElements = containerRef.current.querySelectorAll(".gsap-reveal");
      if (revealElements.length > 0) {
        gsap.fromTo(
          revealElements,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out"
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
