"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

type WaveformPlayerProps = {
  audioUrl: string;
  height?: number;
};

export default function WaveformPlayer({ audioUrl, height = 64 }: WaveformPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy any existing instance before creating a new one
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ccc",
      progressColor: "#0ea5e9", // Tailwind blue-500
      cursorColor: "#0ea5e9",
      height: 96,
      barWidth: 2
    });

    wavesurfer.load(audioUrl);
    wavesurfer.on("finish", () => setIsPlaying(false));

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, height]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    wavesurferRef.current.playPause();
    setIsPlaying(wavesurferRef.current.isPlaying());
  };

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full rounded-md overflow-hidden" />
      <button
        onClick={togglePlay}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}