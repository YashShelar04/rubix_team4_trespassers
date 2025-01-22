<<<<<<< Updated upstream:src/app/page.tsx
import Image from "next/image";
import '../styles/globals.css';
=======
"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
>>>>>>> Stashed changes:app/page.tsx

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconTerminal2, IconNewSection, IconExchange, IconBrandX, IconBrandGithub } from "@tabler/icons-react";
import { NavigationMenuDemo } from "@/ui-components/Navbar";
import { Button } from "@/components/ui/button";
import {HeroHighlightDemo} from "@/ui-components/background";
export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute mt-5 left-1/2 transform -translate-x-1/2 z-30 rounded-3xl shadow-xl">
        <div className="inline-block">
          <NavigationMenuDemo />
        </div>
      </div>
      <div className="absolute right-0 mt-5 mr-5 z-30">
          <Button>Login/SignUp</Button>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <HeroHighlightDemo />
      </div>
    </div>
  );
}
