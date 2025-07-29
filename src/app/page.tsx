import Link from 'next/link';
import Image from "next/image";
import BeatCard from "./components/BeatCard";
import VantaBG from "./components/VantaBG"
import Intro from "./components/Intro"
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
    title: "Ripple Effect",
    description: "07-04-2024",
    slug: "ripple",
    audio: "/beats/ripple effect - 137 bpm.mp3"
  },
  
  {
    title: "Fly",
    description: "04-17-2025",
    slug: "fly",
    audio: "/beats/fly - 160bpm.mp3"
  },

  {
    title: "Stargazing",
    description: "06-19-2024",
    slug: "stargazing",
    audio: "/beats/stargazing - 150 bpm.mp3"
  },

  {
    title: "Angels",
    description: "01-21-2022",
    slug: "angels",
    audio: "/beats/rerock.mp3"
  },
];

export default function Home() {
  return (
    <>
      <VantaBG />
      <div className="h-screen overflow-y-auto scrollbar-hide flex flex-col items-end">
      <div className="flex flex-col w-1/2 px-4 py-8 items-end gap-6">
        {posts.map((post) => (
          <BeatCard key={post.slug} {...post} />
        ))}
      </div>
      </div>
    </>
  );
}
