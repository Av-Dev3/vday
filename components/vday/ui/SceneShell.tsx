"use client";

import { ReactNode } from "react";

interface SceneShellProps {
  children: ReactNode;
  className?: string;
}

export function SceneShell({ children, className = "" }: SceneShellProps) {
  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
}
