"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VantaNetBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef) {
      // Dynamic import for vanta.topology
      Promise.all([import("vanta/src/vanta.topology"), import("p5")]).then(([VANTA, p5]) => {
        const effect = VANTA.default({
          el: vantaRef.current,
          p5: p5.default,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xa1cbfc,
          backgroundColor: 0x0
        });
        setVantaEffect(effect);
      });
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute top-0 left-0 w-screen h-screen z-[-1] bg-transparent" />;
}
