"use client";

import { useRef, useState, useEffect } from "react";
import { media, type MediaItem } from "@/data/vday/media";
import { lyrics, type LyricWord } from "@/data/vday/lyrics-parsed";

interface SlideshowSceneProps {
  onComplete: () => void;
}

export function SlideshowScene({ onComplete }: SlideshowSceneProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const currentMedia = media[currentIndex];
  const SONG_DURATION = 174; // 2:54 in seconds
  const DISPLAY_TIME = Math.floor(((SONG_DURATION - 1) / media.length) * 1000); // ~5.2 seconds per item

  // Auto-start music and monitor time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setShowPlayPrompt(true);
        });
    }

    // Update current time and check if we've reached the end
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Stop and transition at exactly 2:54
      if (audio.currentTime >= SONG_DURATION) {
        audio.pause();
        audio.currentTime = 0;
        onComplete();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onComplete]);

  // Handle slideshow progression
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < media.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      // Don't auto-complete - let the song ending trigger completion
    }, DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handle video playback
  useEffect(() => {
    if (currentMedia.type === 'video') {
      const videoEl = videoRefs.current[currentMedia.path];
      if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch(console.error);
      }
    }
  }, [currentIndex, currentMedia]);

  const handlePromptPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
    setShowPlayPrompt(false);
  };

  // Get current active words
  const getActiveWords = () => {
    const activeLine = lyrics.find((line, index) => {
      const nextLine = lyrics[index + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });

    if (!activeLine) return [];

    return activeLine.words.map((word, index) => ({
      ...word,
      isActive: currentTime >= word.time && 
                (index === activeLine.words.length - 1 || currentTime < activeLine.words[index + 1].time)
    }));
  };

  const activeWords = getActiveWords();

  return (
    <div className="fixed inset-0 bg-black">
      {/* Audio */}
      <audio ref={audioRef} src="/song.mp3" loop={false} />

      {/* Play prompt overlay */}
      {showPlayPrompt && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <button
            onClick={handlePromptPlay}
            className="px-8 py-4 bg-white text-vday-rose font-bold text-xl rounded-full hover:scale-110 transition-transform"
          >
            ▶ Tap to start music
          </button>
        </div>
      )}

      {/* Slideshow */}
      <div className="relative w-full h-full flex items-center justify-center">
        {media.map((item, index) => (
          <div
            key={item.path}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.type === 'image' ? (
              <img
                src={item.path}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                ref={(el) => {
                  if (el) videoRefs.current[item.path] = el;
                }}
                src={item.path}
                muted
                playsInline
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        ))}

        {/* Animated Lyrics Overlay */}
        <div className="absolute inset-x-0 bottom-24 z-20 pointer-events-none">
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-wrap justify-center gap-2 text-3xl md:text-4xl font-bold text-center leading-relaxed">
              {activeWords.map((word, index) => (
                <span
                  key={`${word.time}-${index}`}
                  className={`inline-block transition-all duration-300 ${
                    word.isActive
                      ? 'text-vday-pink scale-105'
                      : 'text-white/70 scale-100'
                  }`}
                  style={{
                    textShadow: word.isActive
                      ? '0 0 15px rgba(255,179,186,0.8), 0 2px 10px rgba(0,0,0,0.9)'
                      : '0 2px 10px rgba(0,0,0,0.9)',
                  }}
                >
                  {word.word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
