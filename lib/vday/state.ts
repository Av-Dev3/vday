"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEY } from "./config";

export type VDayState =
  | "gate"
  | "video"
  | "click_open"
  | "slideshow"
  | "card"
  | "lyrics"
  | "reveal"
  | "final_gate"
  | "gift";

export interface Progress {
  state: VDayState;
  foundClues: string[];
  attempts: number;
}

const defaultProgress: Progress = {
  state: "gate",
  foundClues: [],
  attempts: 0,
};

export function useVdayProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Progress;
        setProgress(parsed);
      }
    } catch (err) {
      console.error("Failed to load progress:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  }, [progress, isLoaded]);

  const setState = (nextState: VDayState) => {
    setProgress((prev) => ({ ...prev, state: nextState }));
  };

  const markClueFound = (id: string) => {
    setProgress((prev) => {
      if (prev.foundClues.includes(id)) return prev;
      return { ...prev, foundClues: [...prev.foundClues, id] };
    });
  };

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProgress(defaultProgress);
    } catch (err) {
      console.error("Failed to reset:", err);
    }
  };

  const incrementAttempts = () => {
    setProgress((prev) => ({ ...prev, attempts: prev.attempts + 1 }));
  };

  return {
    progress,
    isLoaded,
    setState,
    markClueFound,
    reset,
    incrementAttempts,
  };
}
