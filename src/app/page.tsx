import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BioProvider } from "@/context/BioContext";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 py-12 sm:py-16 sm:px-8 md:px-10 lg:p-24">
      {/* Hero Section */}
      <div className="col-span-full group w-full flex flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        {/* GitHub Star Link */}
        <Link href="https://github.com/dali012" target="_blank">
          <AnimatedGradientText className="px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Star on GitHub
            <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>

        {/* Main Heading */}
        <TypingAnimation
          as="h1"
          className="font-extrabold text-4xl md:text-5xl slg:text-6xl lg:text-7xl text-center w-full lg:w-[90%] uppercase mx-auto pt-4"
        >
          AI-Powered Twitter Bios in Seconds!
        </TypingAnimation>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg text-accent max-w-2xl mx-auto">
          Simply answer a few quick questions, and our AI will craft a Twitter
          bio that perfectly captures your personality.
          <br /> No guesswork, just a bio that stands out!
        </p>
      </div>

      {/* Input and Output Sections */}
      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}
