"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEY, COOKIE_NAME } from "@/lib/vday/config";

export default function ResetPage() {
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
    }

    // Clear cookie by setting it to expire
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    setIsReset(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="text-center">
        {isReset ? (
          <>
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Reset Complete
            </h1>
            <p className="text-gray-300 mb-8">
              All progress has been cleared.
            </p>
            <a
              href="/vday"
              className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Return to Experience
            </a>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4 animate-spin">⏳</div>
            <p className="text-white text-xl">Resetting...</p>
          </>
        )}
      </div>
    </div>
  );
}
