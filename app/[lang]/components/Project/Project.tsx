import APPSHOP from "../../../../public/appstore.png";
import DRINKSHOP from "../../../../public/drinkshop.png";
import RICHARD from "../../../../public/richard.png";
import SHOEAI from '../../../../public/shoeAI.png';
import TDTUFIND from "../../../../public/tdtufind.png";
import { Timeline } from '../ui/timeline';
import Content from './Content';

const Project = () => {
  const data = [
    {
      title: "AI E-shoes Shop",
      content: (
        <Content
          techs={["spring", "aws", "openai", "mysql", "reactjs", "tailwindcss", "shadcnui", "reactquery", "reactrouter"]}
          description='AI E-shoes Shop is an online shoe store that integrates artificial intelligence to enhance the customer shopping experience. The AI assistant analyzes customer preferences, such as shoe size, style, activity type, and past purchases, to recommend the most suitable options. The platform also offers virtual shoe fitting, personalized suggestions, and real-time customer assistance. This project focuses on improving customer satisfaction by reducing the time spent searching for the right product and increasing purchase confidence.'
          image={SHOEAI}
        />
      ),
    },
    {
      title: "TDTU FIND",
      content: (
        <Content
          techs={["nodejs", "mongodb", "cloudinary", "reactjs", "tailwindcss", "shadcnui"]}
          description='TDTU FIND is a web-based application designed to help students report and recover lost items at the university. It allows users to post details about lost or found items, creating a streamlined and organized platform for quick retrieval. The system features a simple interface where students can describe the lost items, upload images, and provide contact information. The platform matches lost items with potential findings, notifying the owners when a match occurs.'
          image={TDTUFIND}
        />
      ),
    },
    {
      title: "Richard Tran Copywriter",
      content: (
        <Content
          techs={["wordpress"]}
          description='RICHARD COPY WRITER is a comprehensive web application designed to introduce spa-related courses and offer an affiliate marketing program. The platform allows users to browse through detailed information about various spa courses, enroll in the affiliate program to promote courses, and register for an account to purchase and study spa courses via video tutorials. The website features a seamless user experience, including course purchasing, video streaming, and affiliate tracking to encourage user participation and learning.'
          image={RICHARD}
        />
      ),
    },
    {
      title: "Drink water shop",
      content: (
        <Content
          techs={["spring", "mysql", "html5", "css3", "bootstrap4"]}
          description='Drink Water Shop is a web-based application designed to allow users to browse, select, and purchase different types of water products. The platform features a user-friendly shopping experience, including product filters, cart management, and online payment options. For administrators, the system includes a management dashboard where they can track inventory, manage water products, and oversee employee activities such as order fulfillment and customer service. The platform also generates reports to help admins monitor sales and stock levels.'
          image={DRINKSHOP}
        />
      ),
    }, {
      title: "App and Game Marketplace",
      content: (
        <Content
          techs={["php", "mysql", "html5", "css3", "bootstrap4"]}
          description='App and Game Marketplace is an e-commerce platform that allows users to explore, purchase, and download a variety of apps and games. The platform includes features like search filters, product recommendations, user reviews, and secure payment gateways. Registered users can sign up as members to post, manage, and sell their own games on the platform, with access to a personalized dashboard for tracking downloads, sales, and reviews. Admins have tools to manage content, monitor transactions, and ensure marketplace quality.'
          image={APPSHOP}
        />
      ),
    },
  ];
  return (
    <section>
      <Timeline data={data} />
    </section>
  )
}

export default Project