"use client";

import Image from "next/image";
import Link from "next/link";
import Waveform from "./Waveform";
import { useEffect, useRef, useState } from "react"
import WaveSurfer from "wavesurfer.js";

type CardProps = {
  title: string;
  description: string;
  slug: string;
  audio: string;
};

export default function BeatCard({ title, description, slug, audio } : CardProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0

  useEffect(() => {
    if (!waveformRef.current) return;

    if(wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#fff",
      progressColor: "#aaa",
      height: 64,
      barWidth: 2,
      url: audio,
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
    };
  }, [audio]);

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

  return (
    <div className="w-full bg-neutral-900/95 rounded-xl overflow-hidden max-w-3xl flex flex-col sm:flex-row text-white">
      {/* Right: Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex gap-4">
          {/* Waveform */}
          <div className="flex-1">
            <div ref={waveformRef} className="w-full rounded-md overflow-hidden" />
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="p-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                {isPlaying ? (
                  // Pause icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  // Play icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <span className="text-sm text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex flex-col items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
            <div className="relative h-[100px] w-[8px] flex items-center justify-center">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-[100px] h-[8px] rotate-[-90deg] origin-center appearance-none bg-gray-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}