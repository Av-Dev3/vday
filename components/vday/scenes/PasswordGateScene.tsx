"use client";

import { useState } from "react";
import { SceneShell } from "../ui/SceneShell";
import { INITIAL_PASSWORD } from "@/lib/vday/config";

interface PasswordGateSceneProps {
  onSuccess: () => void;
}

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

export function PasswordGateScene({ onSuccess }: PasswordGateSceneProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [showingHint, setShowingHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === INITIAL_PASSWORD.toLowerCase()) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleHintClick = () => {
    setShowingHint(true);
    
    // Create 30 snowflakes with random positions and speeds
    const newSnowflakes: Snowflake[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4, // 3-7 seconds
      size: 0.5 + Math.random() * 1, // 0.5-1.5 em
    }));
    
    setSnowflakes(newSnowflakes);
    
    // Clear snowflakes after they've fallen
    setTimeout(() => {
      setSnowflakes([]);
      setShowingHint(false);
    }, 7000);
  };

  return (
    <SceneShell className="bg-gradient-to-br from-vday-pink to-vday-rose relative overflow-hidden">
      {/* Falling snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white pointer-events-none animate-snowfall"
          style={{
            left: `${flake.left}%`,
            top: "-20px",
            fontSize: `${flake.size}em`,
            animationDuration: `${flake.animationDuration}s`,
            opacity: 0.8 + Math.random() * 0.2,
          }}
        >
          ❄️
        </div>
      ))}

      <div className="text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-pulse">
          ❤️
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Happy Valentine's Day
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Enter the password to begin your journey
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className={`w-full px-6 py-4 text-lg rounded-full border-2 text-center focus:outline-none focus:ring-4 transition-all ${
              error
                ? "border-red-500 animate-shake bg-red-50"
                : "border-white/30 focus:border-white bg-white/90"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-white mt-2 font-medium">
              Incorrect password. Try again!
            </p>
          )}
          
          <div className="flex gap-4 justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-white text-vday-rose font-bold text-lg rounded-full hover:bg-vday-cream hover:scale-105 transition-all shadow-lg"
            >
              Enter
            </button>
            
            <button
              type="button"
              onClick={handleHintClick}
              disabled={showingHint}
              className="px-6 py-4 bg-white/20 text-white font-medium text-lg rounded-full hover:bg-white/30 hover:scale-105 transition-all shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Need a hint?"
            >
              💡 Hint
            </button>
          </div>
        </form>
      </div>
    </SceneShell>
  );
}
