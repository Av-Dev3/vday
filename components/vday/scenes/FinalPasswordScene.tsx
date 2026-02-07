"use client";

import { useState } from "react";
import { SceneShell } from "../ui/SceneShell";

interface FinalPasswordSceneProps {
  onSuccess: () => void;
}

export function FinalPasswordScene({ onSuccess }: FinalPasswordSceneProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch("/api/vday/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (data.ok) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => setError(false), 500);
      }
    } catch (err) {
      console.error("Validation error:", err);
      setError(true);
      setTimeout(() => setError(false), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SceneShell className="bg-gradient-to-br from-vday-lavender to-vday-purple">
      <div className="text-center">
        <div className="text-6xl mb-6">🔐</div>
        <h2 className="text-4xl font-bold text-white mb-4">
          One Final Question
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
          Combine the clue words you found to unlock your final gift
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className={`w-full px-6 py-4 text-lg rounded-full border-2 text-center focus:outline-none focus:ring-4 transition-all ${
              error
                ? "border-red-500 animate-shake bg-red-50"
                : "border-white/30 focus:border-white bg-white/90"
            }`}
            autoFocus
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-white mt-2 font-medium">
              Not quite right. Try again!
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 px-8 py-4 bg-white text-vday-purple font-bold text-lg rounded-full hover:bg-vday-cream hover:scale-105 transition-all shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Checking..." : "Unlock Gift"}
          </button>
        </form>
      </div>
    </SceneShell>
  );
}
