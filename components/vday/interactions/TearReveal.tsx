"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface TearRevealProps {
  id: string;
  content: string;
  isImage?: boolean;
  word?: string;
  onComplete: (id: string) => void;
  alreadyFound: boolean;
}

export function TearReveal({
  id,
  content,
  isImage = false,
  word,
  onComplete,
  alreadyFound,
}: TearRevealProps) {
  const [tearProgress, setTearProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  useEffect(() => {
    if (alreadyFound) {
      setTearProgress(100);
    }
  }, [alreadyFound]);

  const handleStart = (clientX: number) => {
    if (alreadyFound) return;
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current || alreadyFound) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = clientX - startXRef.current;
    const progress = Math.max(0, Math.min(100, (deltaX / rect.width) * 100));
    setTearProgress(progress);

    if (progress >= 70 && !alreadyFound) {
      // Complete the tear
      gsap.to({}, {
        duration: 0.5,
        onUpdate: function () {
          setTearProgress(100);
        },
        onComplete: () => {
          onComplete(id);
        },
      });
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg cursor-grab active:cursor-grabbing"
    >
      {/* Hidden content */}
      <div className="absolute inset-0">
        {isImage ? (
          <img
            src={content}
            alt="Hidden surprise"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-vday-pink to-vday-rose flex items-center justify-center p-6">
            <p className="text-white text-center text-lg font-medium">
              {content}
            </p>
          </div>
        )}
        {word && tearProgress === 100 && (
          <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 rounded-full shadow-lg">
            <span className="text-vday-rose font-bold">{word}</span>
          </div>
        )}
      </div>

      {/* Tear overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-vday-cream to-vday-lavender pointer-events-none"
        style={{
          clipPath: `polygon(
            ${tearProgress}% 0%, 
            100% 0%, 
            100% 100%, 
            ${tearProgress + 2}% 100%, 
            ${tearProgress + 1}% 90%, 
            ${tearProgress}% 80%, 
            ${tearProgress + 2}% 70%, 
            ${tearProgress}% 60%, 
            ${tearProgress + 1}% 50%, 
            ${tearProgress}% 40%, 
            ${tearProgress + 2}% 30%, 
            ${tearProgress}% 20%, 
            ${tearProgress + 1}% 10%
          )`,
        }}
      />

      {/* Drag handle */}
      {!alreadyFound && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-vday-rose rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${tearProgress}%` }}
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          <span className="text-white text-2xl">→</span>
        </div>
      )}

      {/* Event handlers */}
      <div
        className="absolute inset-0"
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      />

      {alreadyFound && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
          <span className="text-white text-2xl font-bold">✓ Found!</span>
        </div>
      )}
    </div>
  );
}
