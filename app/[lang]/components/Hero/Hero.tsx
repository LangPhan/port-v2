import { Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../../../public/logo.png";
import mainImage from "../../../../public/main.png";
import secondImage from "../../../../public/main_2.png";
import { BackgroundLines } from "../ui/background-lines";
import { FlipWords } from "../ui/flip-words";
import { GlareCard } from "../ui/glare-card";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Spotlight } from "../ui/spotlight";

const Hero = ({ dictionary }: { dictionary: any }) => {
  const words = [
    "Front-end",
    "Back-end",
    "Full-stack",
  ];
  return (
    <section className="relative w-full overflow-hidden">
      <BackgroundLines className="bg-transparent">
        <Spotlight
          className="-top-40 left-0 md:left-42 md:-top-16"
          fill="white"
        />
        <div className="container flex justify-between items-center h-full">
          <div className="w-full xl:w-1/2 flex flex-col items-center gap-5">
            <div className="flex flex-col xl:flex-row items-center xl:-translate-x-10 select-none">
              <Image
                className="hidden w-1/2 md:w-full md:block"
                src={Avatar}
                alt="avatar"
                height={280}
                width={280}
              />
              <span className="bg-gradient-to-br from-slate-200 via-blue-500 to-blue-700 bg-clip-text text-transparent md:text-6xl font-extrabold text-3xl text-center md:text-left md:leading-[4.5rem] animate-fade-in md:min-w-[500px]">
                <h2>{dictionary.hello}</h2>
                <FlipWords
                  words={words}
                  duration={1000}
                  className="p-0"
                />
                <h2>Developer</h2>
              </span>
            </div>
            <div className="flex justify-center items-center gap-4 w-full">
              <Link href={"#profile"}>
                <HoverBorderGradient className="flex gap-1 group py-3">
                  <Compass className="group-hover:rotate-180 transition-transform duration-500" />
                  <span>{dictionary.button}</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 hidden xl:flex items-center justify-center">
            <div className="absolute rotate-12 right-0 hover:translate-x-24 hover:rotate-0 transition-transform duration-500">
              <GlareCard>
                <Image src={secondImage} alt="Main Image"
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
