"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VantaBirdsBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  /*
  const THREE = {
    ...THREEOriginal,
    PlaneBufferGeometry: (THREEOriginal as any).PlaneBufferGeometry || THREEOriginal.PlaneGeometry,
  };
  */


  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined" && vantaRef.current){      
      import("vanta/src/vanta.birds").then((VANTA) => {
        const Birds = VANTA.default;
        
        const effect = Birds({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x0,
          color1: 0x37a0ff,
          color2: 0xff00e0,
          birdSize: 0.5,
          wingSpan: 34.00,
          speedLimit: 4.00,
          separation: 40.00,
          alignment: 10.00,
          cohesion: 3.00,
          quantity: 4.00
        });
        setVantaEffect(effect);

      });
    }

    return () => {
      vantaEffect?.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute top-0 left-0 w-screen h-screen z-[-1] bg-transparent" />;
}
