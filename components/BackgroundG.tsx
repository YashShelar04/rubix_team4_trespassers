"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface BackgroundGProps {
  children: React.ReactNode;
}

function BackgroundG({ children }: BackgroundGProps) {
  return (
    <div className="mt-20 w-[20%]">
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
        {children}
      </BackgroundGradient>
    </div>
  );
}

export default BackgroundG;
