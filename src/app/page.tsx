import Link from 'next/link';
import Image from "next/image";
import BeatCard from "./components/BeatCard";
import VantaBG from "./components/VantaBG";
import Carousel from "./components/Carousel";
import { Urbanist, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
})

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap"
})


const posts = [
  {
    title: "Fallen",
    description: "April 29th, 2025",
    image: "",
    slug: "fallen",
    audio: "/beats/fallen - 140 bpm.mp3"
  },

  {
    title: "Fly",
    description: "April 17th, 2025",
    image: "",
    slug: "fly",
    audio: "/beats/fly - 160bpm.mp3"
  },
  
  {
    title: "Voice",
    description: "January 29th 2025",
    image: "",
    slug: "voice",
    audio: "/beats/ambience - 135 bpm.mp3"
  },

  {
    title: "Ripple Effect",
    description: "July 4th, 2024",
    image: "",
    slug: "ripple",
    audio: "/beats/ripple effect - 137 bpm.mp3"
  },

  {
    title: "Stargazing",
    description: "June 19th, 2024",
    image: "",
    slug: "stargazing",
    audio: "/beats/stargazing - 150 bpm.mp3"
  },

  {
    title: "Angels",
    description: "January 21st, 2022",
    image: "",
    slug: "angels",
    audio: "/beats/rerock.mp3"
  },

  {
    title: "Sandstorm",
    description: "November 26th, 2020",
    image: "",
    slug: "sandstorm",
    audio: "/beats/maxbeat103.mp3"
  },
];

export default function Home() {
  return (
    <>
      <VantaBG />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Carousel cards={posts} />
      </div>
      {/*
      <div className="h-screen overflow-y-auto scrollbar-hide flex flex-col items-end">
      <div className="flex flex-col w-1/2 px-4 py-8 items-end gap-6">

      </div>
      </div>
      -->
      */}
    </>
  );
}
