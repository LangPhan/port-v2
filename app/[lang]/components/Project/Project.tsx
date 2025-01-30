import APPSHOP from "../../../../public/appstore.png";
import DRINKSHOP from "../../../../public/drinkshop.png";
import KADA from "../../../../public/kada.png";
import RICHARD from "../../../../public/richard.png";
import SHOEAI from '../../../../public/shoeAI.png';
import TDTUFIND from "../../../../public/tdtufind.png";
import { Timeline } from '../ui/timeline';
import Content from './Content';

const Project = ({ dictionary }: { dictionary: any }) => {
  const data = [
    {
      title: "AI E-shoes Shop",
      content: (
        <Content
          techs={["spring", "aws", "openai", "mysql", "reactjs", "tailwindcss", "shadcnui", "reactquery", "reactrouter"]}
          description={dictionary.project["ai-shoe"]}
          image={SHOEAI}
        />
      ),
    },
    {
      title: "KADA HomePage",
      content: (
        <Content
          techs={["nextjs", "reactjs", "tailwindcss"]}
          description={dictionary.project["kada"]}
          image={KADA}
          visitUrl="https://kada.vn"
        />
      ),
    },

    {
      title: "TDTU FIND",
      content: (
        <Content
          techs={["nodejs", "mongodb", "cloudinary", "reactjs", "tailwindcss", "shadcnui"]}
          description={dictionary.project["tdtu-find"]}
          image={TDTUFIND}
        />
      ),
    },
    {
      title: "Richard Tran Copywriter",
      content: (
        <Content
          techs={["wordpress"]}
          description={dictionary.project["richard"]}
          image={RICHARD}
        />
      ),
    },
    {
      title: "Drink water shop",
      content: (
        <Content
          techs={["spring", "mysql", "html5", "css3", "bootstrap4"]}
          description={dictionary.project["drink-shop"]}
          image={DRINKSHOP}
        />
      ),
    },
    {
      title: "App and Game Marketplace",
      content: (
        <Content
          techs={["php", "mysql", "html5", "css3", "bootstrap4"]}
          description={dictionary.project["app-marketplace"]}
          image={APPSHOP}
        />
      ),
    },
  ];

  return (
    <section>
      <Timeline data={data} dictionary={dictionary} />
    </section>
  )
}

export default Project