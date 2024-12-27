'use client'

import IconCloud from "../ui/icon-cloud";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const Profile = ({ dictionary }: { dictionary: any }) => {
  const words = dictionary.intro;
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "nestjs",
    "figma",
  ];
  return (
    <section id="profile" className="h-screen container mt-24">
      <TextGenerateEffect words={words} />
      <IconCloud iconSlugs={slugs} />
    </section>
  )
}

export default Profile