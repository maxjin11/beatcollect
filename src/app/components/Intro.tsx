"use client";

import Image from "next/image";

export default function Intro() {
    return (
        <div>
            <Image src="/images/image.jpg" alt="me" fill className="object-cover" />
        </div>
    );
}