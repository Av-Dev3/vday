"use client";

import { useRef, useEffect, useState } from "react";
import { SceneShell } from "../ui/SceneShell";

interface IntroVideoSceneProps {
  onComplete: () => void;
}

export function IntroVideoScene({ onComplete }: IntroVideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Start fade out
      setIsFadingOut(true);
      // Complete transition after fade
      setTimeout(() => {
        onComplete();
      }, 1000); // 1 second fade
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src="/introvid.mp4"
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
