import Layout from "../components/Layout";
import TopSection from "../components/about/TopSection";
import MiddleSection from "../components/about/MiddleSection";
import BottomSection from "../components/about/BottomSection";
import { createWebPageSchema } from "../common/seoConfig";

const aboutDescription =
  "Discover Buildrex Construction's multidisciplinary team delivering social housing refurbishments, emergency accommodation, and maintenance programmes across Ireland.";

const AboutPage = () => (
  <Layout
    title="About | Buildrex Construction"
    description={aboutDescription}
    image="/images/home_middle/team.jpg"
    structuredData={createWebPageSchema({
      path: "/about",
      name: "About Buildrex Construction",
      description: aboutDescription,
      image: "/images/home_middle/team.jpg",
    })}
  >
    <TopSection />
    <MiddleSection />
    <BottomSection />
  </Layout>
);

export default AboutPage;
