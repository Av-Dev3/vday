"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

interface CardOpenSceneProps {
  onComplete: () => void;
}

export function CardOpenScene({ onComplete }: CardOpenSceneProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const flapPanelRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (canContinue) {
      onComplete();
      return;
    }

    if (isOpening) return;
    setIsOpening(true);

    if (flapPanelRef.current) {
      gsap.set(flapPanelRef.current, {
        rotationX: 0,
        y: 0,
        transformOrigin: "50% 0%",
        transformPerspective: 850,
        force3D: true,
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCanContinue(true);
      },
    });

    // 1. True hinge inversion: flap rotates over to show its back face.
    tl.to(flapPanelRef.current, {
      rotationX: -180,
      y: 0,
      duration: 0.9,
      ease: "power2.inOut",
      force3D: true,
    })
      // 2. Letter slides out only after flap fully opens.
      .to(
        letterRef.current,
        {
          y: "-80%",
          zIndex: 10,
          duration: 1.4,
          ease: "power3.out",
        },
        "+=0.2"
      );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center cursor-pointer"
      style={{ background: "#fce4ec" }}
      role="button"
      tabIndex={0}
      aria-label={canContinue ? "Continue to next scene" : "Open envelope"}
      onClick={handleClick}
    >
      <div
        ref={wrapperRef}
        className="relative pointer-events-none"
        style={{ width: "80vmin", height: "50vmin", perspective: "850px", transformStyle: "preserve-3d" }}
      >
        {!isOpening && (
          <p
            className="absolute -bottom-16 left-0 right-0 text-center animate-pulse"
            style={{ color: "#c94050", fontSize: "clamp(18px, 4vmin, 32px)", fontWeight: 600 }}
          >
            Click to open
          </p>
        )}

        {canContinue && (
          <p
            className="absolute -bottom-16 left-0 right-0 text-center animate-pulse"
            style={{ color: "#b23646", fontSize: "clamp(18px, 4vmin, 32px)", fontWeight: 700 }}
          >
            Click to continue
          </p>
        )}

        <div
          ref={letterRef}
          className="absolute flex items-center justify-center"
          style={{
            left: "8%",
            right: "8%",
            top: "15%",
            bottom: "10%",
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            zIndex: 0,
          }}
        >
          <div className="text-center" style={{ padding: "clamp(12px, 4vmin, 40px)" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 6vmin, 56px)",
                fontWeight: 700,
                color: "#e8536a",
                marginBottom: "clamp(8px, 2vmin, 24px)",
              }}
            >
              To My Love
            </h2>
            <p
              style={{
                fontSize: "clamp(12px, 3vmin, 24px)",
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "clamp(8px, 2vmin, 24px)",
              }}
            >
              Every moment with you is a treasure.
              <br />
              Thank you for being my everything.
            </p>
            <span style={{ fontSize: "clamp(28px, 8vmin, 64px)" }}>&hearts;</span>
          </div>
        </div>

        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#e06070",
              borderRadius: 12,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, #d4505e 50%, transparent 50%)",
              borderRadius: 12,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom left, #d04858 50%, transparent 50%)",
              borderRadius: 12,
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "65%",
              backgroundColor: "#e8636e",
              borderRadius: "0 0 12px 12px",
              clipPath: "polygon(0 30%, 50% 0%, 100% 30%, 100% 100%, 0 100%)",
              zIndex: 1,
            }}
          />
        </div>

        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 4,
            pointerEvents: "none",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={flapPanelRef}
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #bf3f4f, #d14b5a)",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                backfaceVisibility: "hidden",
                borderRadius: "12px 12px 0 0",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #e4aab4, #d996a2)",
                clipPath: "polygon(0 100%, 50% 0%, 100% 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
                borderRadius: "0 0 12px 12px",
              }}
            />
          </div>
        </div>

        <div
          className="absolute"
          style={{
            bottom: -20,
            left: "10%",
            right: "10%",
            height: 30,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
      </div>
    </div>
  );
}
