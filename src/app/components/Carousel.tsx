"use client";
import { useEffect, useRef, useState } from "react";
import BeatCard from "./BeatCard"; // your card component

type Card = {
  title: string;
  description: string;
  image: string;
  slug: string;
  audio: string;
  isActive?: boolean;
  cardIndex?: number;
};

type Props = {
  cards: Card[];
};


export default function Carousel({ cards }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);


  const rotate = (dir: "left" | "right") => {
    setActiveIndex((prev) =>
      dir === "left"
        ? (prev - 1 + cards.length) % cards.length
        : (prev + 1) % cards.length
    );
  };

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) rotate("right");
      else rotate("left");

      setTimeout(() => {
        isScrolling = false;
      }, 400);

    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel);

    return () => container?.removeEventListener("wheel", handleWheel);
  }, [cards.length]);

  const angleStep = 360 / cards.length;

  return (
    <div className="w-screen h-screen rounded-xl overflow-hidden flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-1/3 h-1/5 perspective-[1000px] overflow-visible rounded-xl"
      >
        {cards.map((card, index) => {
          const offset = ((index - activeIndex + cards.length + Math.floor(cards.length / 2)) % cards.length) - Math.floor(cards.length / 2);
          const angle = angleStep * offset;
          const transform = `rotateY(${angle}deg) translateZ(500px)`;

          const isActive = index === activeIndex;

          return (
            <div
              key={card.slug}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
                isActive ? "z-10 scale-110" : "z-0 scale-90 opacity-70"
              }`}
              style={{
                transform,
              }}
            >
              <BeatCard {...card} scale={index === activeIndex ? 1: 0.6} isActive={isActive} cardIndex={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
