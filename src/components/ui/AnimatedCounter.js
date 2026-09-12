"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "" }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const targetVal = parseFloat(value) || 0;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: targetVal,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (nodeRef.current) {
          nodeRef.current.innerText = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
        }
      }
    });
  }, [value, decimals, prefix, suffix]);

  return <span ref={nodeRef} className="tabular-nums">{prefix}0{suffix}</span>;
}
