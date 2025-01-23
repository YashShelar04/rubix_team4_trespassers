import React from "react";
import { ArrowLeft,PhoneCallIcon,Upload } from "lucide-react";
import Link from "next/link";
import BackgroundG from "@/components/BackgroundG";
import TimeLeft from "@/components/TimeLeft";

function SubmitPage() {
  const targetDate = "2025-01-24T11:00:00";
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Back Button */}
      <Link
        href="/"
        className="top-8 left-8 text-white hover:text-cyan-400 transition-colors duration-200 fixed"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Content */}
      <div className="flex w-full items-center justify-evenly">
        <BackgroundG>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
                Team Name:
              </div>
              <div>Trespassers</div>
            </h2>
          </div>
        </BackgroundG>
        <BackgroundG>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
                Problem Statement: 2
              </div>
              <div>Domain: Web Development</div>
            </h2>
          </div>
        </BackgroundG>
        <BackgroundG>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-green-400 to-purple-500">
                Time Left:
              </div>
            </h2>
            <TimeLeft targetDate={targetDate} />
          </div>
        </BackgroundG>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center mt-[200px] gap-14">
        <Link href="/">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-4 ring-1 ring-white/10">
              <span className="font-bold text-xl">Join the call</span>
              <PhoneCallIcon className="h-6 w-6" />
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </Link>

        <Link href="/upload-page">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-3 px-4 ring-1 ring-white/10">
              <span className="font-bold text-xl">Upload Project</span>
             <Upload className="h-6 w-6" />
              
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubmitPage;
