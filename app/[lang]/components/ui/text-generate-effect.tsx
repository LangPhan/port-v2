"use client";
import { cn } from "@/[lang]/lib/utils";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}

      >
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <motion.div className="dark:text-white text-black text-lg text-center md:text-2xl md:text-left md:leading-snug tracking-wide"
          initial={{
            opacity: 0,
            y: -50,
          }}
          transition={{
            ease: "linear",
            duration: 1.2,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
        >
          {renderWords()}
        </motion.div>
      </div>
    </div>
  );
};
