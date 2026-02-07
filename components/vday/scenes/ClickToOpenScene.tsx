"use client";

import { SceneShell } from "../ui/SceneShell";

interface ClickToOpenSceneProps {
  onOpen: () => void;
}

export function ClickToOpenScene({ onOpen }: ClickToOpenSceneProps) {
  return (
    <SceneShell className="bg-gradient-to-br from-vday-cream to-vday-lavender">
      <div className="text-center">
        <button
          onClick={onOpen}
          className="group relative px-12 py-6 bg-gradient-to-r from-vday-rose to-vday-purple text-white font-bold text-2xl rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <span className="relative z-10">Click to Open ❤️</span>
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
        <p className="mt-8 text-gray-600 text-lg">
          Something special awaits you...
        </p>
      </div>
    </SceneShell>
  );
}
