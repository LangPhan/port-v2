import Image from "next/image";
import Avatar from "../../../../public/logo.png";
import mainImage from "../../../../public/main.png";
import { BackgroundLines } from "../ui/background-lines";
import { FlipWords } from "../ui/flip-words";
import { GlareCard } from "../ui/glare-card";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Spotlight } from "../ui/spotlight";
const Hero = () => {
  const words = [
    "Front-end",
    "Back-end",
    "Full-stack",
  ];
  return (
    <section className="relative w-full">
      <BackgroundLines className="bg-transparent">
        <Spotlight
          className="-top-40 left-0 md:left-42 md:-top-16"
          fill="white"
        />
        <div className="container flex justify-between items-center h-full">
          <div className="w-1/2 flex flex-col items-center">
            <div className="flex items-center -translate-x-10">
              <Image
                src={Avatar}
                alt="avatar"
                height={280}
                width={280}
              />
              <span className="animate-bg-gradient-to-center-title dark:to-69% select-none bg-gradient-to-br from-[#3178c6] from-[69%] to-black/0 bg-clip-text bg-right-bottom text-6xl font-extrabold text-transparent sm:text-6xl sm:leading-[4.5rem] dark:from-white dark:from-30% dark:via-[#3178c6] dark:to-[#3178c6] dark:bg-[length:300%_300%]">
                <h2>Hello. I'm a</h2>
                <FlipWords
                  words={words}
                  duration={1000}
                  className="p-0"
                />
                <h2>Developer</h2>
              </span>
            </div>
            <div className="flex justify-start w-full">
              <HoverBorderGradient>
                <span>Follow Me</span>
              </HoverBorderGradient>
            </div>
          </div>
          <div className="relative w-1/2 flex items-center justify-center">
            <div className="absolute rotate-12 right-0 hover:translate-x-24 hover:rotate-0 transition-transform duration-500">
              <GlareCard>
                <Image src={mainImage} alt="Main Image"
                  className="-translate-y-1/4 shadow-2xl"
                />
              </GlareCard>

            </div>
            <div className="-rotate-12 hover:rotate-0 transition-transform duration-500">
              <GlareCard>
                <Image src={mainImage} alt="Main Image"
                  className="-translate-y-1/4 shadow-2xl"
                />
              </GlareCard>

            </div>
          </div>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default Hero;
