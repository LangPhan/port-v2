'use client'

import IconCloud from "../ui/icon-cloud";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const Profile = () => {
  const words = `Hi, I'm Dat, a passionate front-end developer with a background in Computer Networking. I love creating visually engaging and user-friendly web applications using HTML, CSS, and JavaScript. As a recent graduate, I'm excited to bring my technical skills and problem-solving mindset to real-world projects and grow in the IT industry.
`
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
    <section className="h-screen container">
      <TextGenerateEffect words={words}
      />
      <IconCloud iconSlugs={slugs} />
    </section>
  )
}

export default Profile