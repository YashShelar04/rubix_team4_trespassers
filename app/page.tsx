import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import SplineComputer from '@/components/SplineComputer';
import FeatureButton from '@/components/FeatureButton';
import HomeBackground from "@/components/HomeBackground";
import NavBar from "@/components/NavBar";

export default function Home() {
  const words = [
    { text: "Innovate," },
    { text: "Collaborate," },
    { text: "Succeed" },
    { text: "!" },
  ];

  return (
    <>
      <NavBar/>
      <div className="relative w-full h-[100vh] overflow-hidden">
        {/* accertinity Background */}
         <HomeBackground/>
        <div/>

        {/* Content Overlay */}
        <div className="relative z-10 w-screen h-full pointer-events-none">
          {/* Login/Signup Button */}
          <div className="absolute top-5 right-10 pointer-events-auto">
            <button className="text-white bg-purple-700 rounded-xl shadow-lg px-2 py-2 z-20 cursor-pointer">
              Login/Signup
            </button>
          </div>
          <div className="absolute top-5 left-10 pointer-events-auto">
          <FeatureButton />
          </div>

          {/* Typewriter Effect */}
          {/* <div className="w-full flex justify-center mt-10">
            <TypewriterEffectSmooth words={words} />
          </div> */}
        </div>
      </div>
    </>
  );
}
