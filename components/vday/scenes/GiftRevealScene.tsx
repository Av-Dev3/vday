"use client";

import { useEffect, useState } from "react";
import { SceneShell } from "../ui/SceneShell";

interface GiftRevealSceneProps {
  onUnauthorized: () => void;
}

interface Gift {
  title: string;
  message: string;
  address: string;
  mapUrl: string;
}

export function GiftRevealScene({ onUnauthorized }: GiftRevealSceneProps) {
  const [gift, setGift] = useState<Gift | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch("/api/vday/gift");
        
        if (response.status === 401) {
          onUnauthorized();
          return;
        }

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setGift(data);
      } catch (err) {
        console.error("Failed to fetch gift:", err);
        setError(true);
      }
    };

    fetchGift();
  }, [onUnauthorized]);

  if (error) {
    return (
      <SceneShell className="bg-gradient-to-br from-red-400 to-red-600">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold mb-4">Oops!</h2>
          <p className="text-lg">Something went wrong. Please try again.</p>
        </div>
      </SceneShell>
    );
  }

  if (!gift) {
    return (
      <SceneShell className="bg-gradient-to-br from-vday-pink to-vday-rose">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">💝</div>
          <p className="text-xl">Loading your gift...</p>
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell className="bg-gradient-to-br from-vday-rose to-vday-purple">
      <div className="text-center">
        <div className="text-7xl mb-6 animate-bounce">🎁</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {gift.title}
        </h1>
        
        <div className="bg-white/95 rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
          <p className="text-gray-800 text-xl md:text-2xl leading-relaxed mb-8">
            {gift.message}
          </p>

          {gift.address && (
            <div className="bg-vday-cream rounded-xl p-6 mb-6">
              <div className="text-4xl mb-3">📍</div>
              <p className="text-gray-700 font-medium text-lg">
                {gift.address}
              </p>
            </div>
          )}

          {gift.mapUrl && (
            <a
              href={gift.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-vday-rose to-vday-purple text-white font-bold text-lg rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Open in Maps 🗺️
            </a>
          )}

          <div className="mt-8 pt-8 border-t-2 border-vday-pink/30">
            <p className="text-vday-rose text-xl font-bold">
              With all my love ❤️
            </p>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
