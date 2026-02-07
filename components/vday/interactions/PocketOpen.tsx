"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

interface PocketOpenProps {
  id: string;
  content: string;
  word?: string;
  onComplete: (id: string) => void;
  alreadyFound: boolean;
}

export function PocketOpen({
  id,
  content,
  word,
  onComplete,
  alreadyFound,
}: PocketOpenProps) {
  const [isOpen, setIsOpen] = useState(alreadyFound);
  const flapRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (alreadyFound || isOpen) return;

    // Animate the flap opening
    if (flapRef.current) {
      gsap.to(flapRef.current, {
        rotateX: -180,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setIsOpen(true);
          onComplete(id);
        },
      });
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div
        className={`relative bg-gradient-to-br from-vday-cream to-vday-pink rounded-lg shadow-lg overflow-hidden ${
          !isOpen && !alreadyFound ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
        }`}
        style={{ perspective: "1000px" }}
        onClick={handleClick}
      >
        {/* Pocket content */}
        <div className="p-8 min-h-[200px] flex items-center justify-center">
          {isOpen || alreadyFound ? (
            <div className="text-center space-y-4">
              <p className="text-gray-800 text-lg">{content}</p>
              {word && (
                <div className="inline-block bg-vday-rose text-white px-6 py-2 rounded-full shadow-lg font-bold">
                  {word}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">📮</div>
              <p className="font-medium">Click to open the pocket</p>
            </div>
          )}
        </div>

        {/* Flap overlay */}
        {!isOpen && !alreadyFound && (
          <div
            ref={flapRef}
            className="absolute inset-0 bg-gradient-to-br from-vday-lavender to-vday-purple rounded-lg flex items-center justify-center"
            style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
          >
            <div className="text-white text-center">
              <div className="text-5xl mb-2">✉️</div>
              <p className="font-medium">Tap to peek inside</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
