"use client";

import { useRef, useState, useEffect } from "react";
import { SceneShell } from "../ui/SceneShell";
import { getLyrics } from "@/lib/vday/data";
import { photos } from "@/data/vday/photos";

interface LyricSlideshowSceneProps {
  onComplete: () => void;
}

export function LyricSlideshowScene({ onComplete }: LyricSlideshowSceneProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  const lyrics = getLyrics();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, show play button
          setShowPlayPrompt(true);
        });
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setTimeout(onComplete, 2000);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [onComplete]);

  // Photo slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      setShowPlayPrompt(false);
    }
  };

  const handlePromptPlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play();
    setShowPlayPrompt(false);
  };

  // Find current lyric
  const currentLyric = lyrics.reduce((acc, lyric) => {
    if (currentTime >= lyric.t) return lyric;
    return acc;
  }, lyrics[0]);

  const currentIndex = lyrics.indexOf(currentLyric);
  const prevLyric = currentIndex > 0 ? lyrics[currentIndex - 1] : null;
  const nextLyric = currentIndex < lyrics.length - 1 ? lyrics[currentIndex + 1] : null;

  return (
    <SceneShell className="bg-gradient-to-br from-vday-purple to-vday-rose">
      <audio ref={audioRef} src="/vday/song.mp3" />

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

      <div className="relative">
        {/* Photo slideshow background */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-8">
          {photos.map((photo, index) => (
            <div
              key={photo}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhotoIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>

        {/* Lyrics display */}
        <div className="text-center space-y-4 min-h-[200px] flex flex-col justify-center">
          {prevLyric && prevLyric.line && (
            <p className="text-white/40 text-lg transition-all duration-500">
              {prevLyric.line}
            </p>
          )}
          {currentLyric.line && (
            <p className="text-white text-3xl md:text-4xl font-bold transition-all duration-500 animate-fadeIn">
              {currentLyric.line}
            </p>
          )}
          {nextLyric && nextLyric.line && (
            <p className="text-white/40 text-lg transition-all duration-500">
              {nextLyric.line}
            </p>
          )}
        </div>

        {/* Play/Pause button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePlayPause}
            className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          >
            <span className="text-vday-rose text-2xl">
              {isPlaying ? "⏸" : "▶"}
            </span>
          </button>
        </div>
      </div>
    </SceneShell>
  );
}
