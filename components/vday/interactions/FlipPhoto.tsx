"use client";

import { useState } from "react";

interface FlipPhotoProps {
  id: string;
  frontImage: string;
  backContent: string;
  word?: string;
  onComplete: (id: string) => void;
  alreadyFound: boolean;
}

export function FlipPhoto({
  id,
  frontImage,
  backContent,
  word,
  onComplete,
  alreadyFound,
}: FlipPhotoProps) {
  const [isFlipped, setIsFlipped] = useState(alreadyFound);

  const handleClick = () => {
    if (!isFlipped && !alreadyFound) {
      setIsFlipped(true);
      setTimeout(() => onComplete(id), 600);
    }
  };

  return (
    <div
      className="relative w-full max-w-sm mx-auto h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={frontImage}
            alt="Click to flip"
            className="w-full h-full object-cover"
          />
          {!alreadyFound && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              Tap to flip
            </div>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg bg-gradient-to-br from-vday-rose to-vday-purple p-8 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-white text-center text-lg mb-6">{backContent}</p>
          {word && (
            <div className="bg-white text-vday-rose px-6 py-3 rounded-full shadow-lg font-bold text-lg">
              {word}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
