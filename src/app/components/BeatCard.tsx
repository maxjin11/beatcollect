"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js";

type CardProps = {
  title: string;
  description: string;
  slug: string;
  audio: string;
  scale?: number;
  isActive?: boolean;
  cardIndex?: number;
};

export default function BeatCard({ title, description, slug, audio, scale = 1, isActive, cardIndex } : CardProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    if (!waveformRef.current) return;

    if(!isActive && wavesurferRef.current?.isPlaying()) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    }

    if(wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#fff",
      progressColor: "#c4b4ff",
      height: 48,
      barWidth: 2,
      url: audio,
      dragToSeek: true,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
    });

    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [audio, isActive]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;

    if(wavesurferRef.current.getDuration() > 0) {
      if (wavesurferRef.current.isPlaying()) {
        wavesurferRef.current.pause();
        setIsPlaying(false);
      } else {
        wavesurferRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (wavesurferRef.current && duration > 0) {
      wavesurferRef.current.seekTo(time / duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(vol);
    }
  };

  const isDragging = useRef(false);
  
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !waveformRef.current) return;

    const rect = waveformRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.min(Math.max(x / rect.width, 0), 1); // clamp 0–1

    wavesurferRef.current?.seekTo(percent);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div 
      className="w-full h-full bg-neutral-900/55 rounded-xl shadow-lg overflow-hidden max-w-3xl flex flex-col sm:flex-row text-white"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Right: Content */}
      <div className="pt-[0.8vh] pl-[0.8vw] w-full h-full flex-1 flex flex-col justify-between">
        <div className="w-1/2 h-full"> 
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-[8px] font-semibold mt-1 mb-1">{description}</p>
        </div>

        <div className="flex gap-4">
          {/* Waveform */}
          <div className="flex-1">
            <div ref={waveformRef} onMouseDown={handleMouseDown} className="w-full rounded-md overflow-hidden cursor-pointer" />
            <div className="mt-1 flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="mt-[0.5vh] mb-[0.5vh] bg-blue-600/0 flex justify-center items-center rounded size-[20px] hover:bg-violet-300 transition duration-250"
              >
                {isPlaying ? (
                  // Pause icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[24px] text-violet-300 hover:text-white transition duration-250"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  // Play icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[24px] text-violet-300 hover:text-white transition duration-250"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-[6px] text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="mr-[1vw] mb-[2vh] flex flex-col items-center justify-center gap-2">
            <div className="relative h-[80px] w-[8px] flex items-center justify-center">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-[100px] h-[6px] rotate-[-90deg] bg-neutral-600/0 origin-center appearance-none cursor-pointer [&::-webkit-slider-thumb]:opacity-0 z-20"
              />

              {/* Background track */}
              <div className="absolute h-full w-2 bg-white pointer-events-none z-0" />

              {/* Filled part */}
              <div
                className="absolute bottom-0 w-2 bg-violet-300 pointer-events-none z-10"
                style={{ height: `${volume * 80}px` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}