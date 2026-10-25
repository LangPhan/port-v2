import type { StaticImageData } from "next/image";
import kada from "../../../../public/kada.png";
import shoe from "../../../../public/shoeAI.png";
import find from "../../../../public/tdtufind.png";
import richard from "../../../../public/richard.png";
import drink from "../../../../public/drinkshop.png";
import marketplace from "../../../../public/appstore.png";

export type ProjectId =
  | "kada"
  | "ai-shoe"
  | "tdtu-find"
  | "richard"
  | "drink-shop"
  | "app-marketplace";
export type PortfolioProject = {
  id: ProjectId;
  title: string;
  image: StaticImageData;
  technologies: readonly string[];
  website?: string;
  repository?: string;
  video?: string;
};

// Only publish links already supplied with the portfolio. Do not infer repositories.
export const projects: readonly PortfolioProject[] = [
  {
    id: "kada",
    title: "KADA",
    image: kada,
    technologies: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    id: "ai-shoe",
    title: "AI E-shoes Shop",
    image: shoe,
    technologies: [
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "React Router",
    ],
    repository: "https://github.com/LangPhan/shoestoreFE",
    video: "https://youtu.be/-g7RMQeTOeA",
  },
  {
    id: "tdtu-find",
    title: "TDTU FIND",
    image: find,
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    repository: "https://github.com/LangPhan/tdtufind",
  },
  {
    id: "richard",
    title: "Richard Tran Copywriter",
    image: richard,
    technologies: ["WordPress"],
  },
  {
    id: "drink-shop",
    title: "Drink Water Shop",
    image: drink,
    technologies: ["Spring", "MySQL", "HTML", "CSS", "Bootstrap"],
  },
  {
    id: "app-marketplace",
    title: "App & Game Marketplace",
    image: marketplace,
    technologies: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
  },
];
