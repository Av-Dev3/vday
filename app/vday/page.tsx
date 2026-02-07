"use client";

import { useVdayProgress } from "@/lib/vday/state";
import { PasswordGateScene } from "@/components/vday/scenes/PasswordGateScene";
import { IntroVideoScene } from "@/components/vday/scenes/IntroVideoScene";
import { ClickToOpenScene } from "@/components/vday/scenes/ClickToOpenScene";
import { SlideshowScene } from "@/components/vday/scenes/SlideshowScene";
import { CardOpenScene } from "@/components/vday/scenes/CardOpenScene";
import { LyricSlideshowScene } from "@/components/vday/scenes/LyricSlideshowScene";
import { RevealSiteScene } from "@/components/vday/scenes/RevealSiteScene";
import { FinalPasswordScene } from "@/components/vday/scenes/FinalPasswordScene";
import { GiftRevealScene } from "@/components/vday/scenes/GiftRevealScene";

export default function VdayPage() {
  const { progress, isLoaded, setState, markClueFound } = useVdayProgress();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vday-pink to-vday-rose">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">❤️</div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  const renderScene = () => {
    switch (progress.state) {
      case "gate":
        return <PasswordGateScene onSuccess={() => setState("video")} />;

      case "video":
        return <IntroVideoScene onComplete={() => setState("click_open")} />;

      case "click_open":
        return <ClickToOpenScene onOpen={() => setState("slideshow")} />;

      case "slideshow":
        return <SlideshowScene onComplete={() => setState("card")} />;

      case "card":
        return <CardOpenScene onComplete={() => setState("lyrics")} />;

      case "lyrics":
        return <LyricSlideshowScene onComplete={() => setState("reveal")} />;

      case "reveal":
        return (
          <RevealSiteScene
            foundClues={progress.foundClues}
            onClueFound={markClueFound}
            onHuntComplete={() => setState("final_gate")}
          />
        );

      case "final_gate":
        return <FinalPasswordScene onSuccess={() => setState("gift")} />;

      case "gift":
        return (
          <GiftRevealScene onUnauthorized={() => setState("final_gate")} />
        );

      default:
        return <PasswordGateScene onSuccess={() => setState("video")} />;
    }
  };

  return (
    <div className="relative">
      <div key={progress.state} className="animate-fadeIn">
        {renderScene()}
      </div>
    </div>
  );
}
