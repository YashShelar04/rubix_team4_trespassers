"use client";
import React from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import HomeBackground from "@/components/HomeBackground";
import NavBar from "@/components/NavBar";
import HackathonDashboard from "./Dashboard/page";

export default function Home() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return <HackathonDashboard />;
  }

  return (
    <>
      <div className="relative w-full h-[100vh] overflow-hidden">
        {/* Background */}
        <HomeBackground />
        {/* Content Overlay */}
        <div className="relative z-10 w-screen h-full pointer-events-none">
          <div className="pointer-events-auto">
            <NavBar />
          </div>
          {/* Login/Signup Button */}
          <div className="absolute top-5 right-10 pointer-events-auto">
            <SignInButton>
              <button className="text-white bg-purple-700 rounded-xl shadow-lg px-2 py-2 z-20 cursor-pointer">
                Login/Signup
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </>
  );
}