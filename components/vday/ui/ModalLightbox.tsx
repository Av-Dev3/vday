"use client";

import { useEffect } from "react";

interface ModalLightboxProps {
  imageSrc: string;
  onClose: () => void;
}

export function ModalLightbox({ imageSrc, onClose }: ModalLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-vday-pink transition-colors"
        aria-label="Close"
      >
        ×
      </button>
      <img
        src={imageSrc}
        alt="Full size"
        className="max-w-full max-h-full object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
