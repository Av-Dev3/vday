"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TestCardPage() {
  const router = useRouter();

  useEffect(() => {
    // Set localStorage to card state
    localStorage.setItem("vday_progress_v1", JSON.stringify({ state: "card" }));
    // Redirect to main page
    router.push("/vday");
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
      <p>Setting up card scene...</p>
    </div>
  );
}
