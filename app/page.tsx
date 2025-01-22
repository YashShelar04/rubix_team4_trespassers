import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import SplineComputer from '@/components/SplineComputer';
import FeatureButton from '@/components/FeatureButton';

export default function Home() {
  const words = [
    { text: "Innovate," },
    { text: "Collaborate," },
    { text: "Succeed" },
    { text: "!" },
  ];

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Spline Background */}
          <SplineComputer/>
        <div/>

        {/* Content Overlay */}
        <div className="relative z-10 w-screen h-full pointer-events-none">
          {/* Login/Signup Button */}
          <div className="absolute top-0 right-10 pointer-events-auto">
            <button className="text-white bg-purple-700 rounded-xl shadow-lg px-2 py-2 z-20 cursor-pointer">
              Login/Signup
            </button>
          </div>
          <div className="absolute top-0 left-10 pointer-events-auto">
          <FeatureButton />
          </div>

          {/* Typewriter Effect */}
          <div className="w-full flex justify-center mt-10">
            <TypewriterEffectSmooth words={words} />
          </div>
        </div>
      </div>
    </>
  );
}
