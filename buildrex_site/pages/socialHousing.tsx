import Layout from "../components/Layout";
import TopSection from "../components/socialHouse/topSection";
import { createWebPageSchema } from "../common/seoConfig";

const socialHousingDescription =
  "See how Buildrex Construction revitalises properties for social housing leasing schemes through compliant refurbishments and turnkey delivery.";

const SocialHousePage = () => (
  <Layout
    title="Social Housing | Buildrex Construction"
    description={socialHousingDescription}
    image="/images/services/forestCresent/forestCresent_3.jpeg"
    structuredData={createWebPageSchema({
      path: "/socialHousing",
      name: "Social Housing Projects",
      description: socialHousingDescription,
      image: "/images/services/forestCresent/forestCresent_3.jpeg",
    })}
  >
    <TopSection />
  </Layout>
);

export default SocialHousePage;