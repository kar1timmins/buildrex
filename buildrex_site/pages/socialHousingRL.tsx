import Layout from "../components/Layout";
import TopSection from "../components/socialHouseRL/socialHousingRL";
import { createWebPageSchema } from "../common/seoConfig";

const repairLeaseDescription =
  "Review Buildrex Construction repair and leasing social housing projects, showcasing high-quality renovations for local authorities.";

const SocialHouseRLPage = () => (
  <Layout
    title="Social Housing R&L | Buildrex Construction"
    description={repairLeaseDescription}
    image="/images/social_housing_r_l/dolphin_road/6 Dolphin Road Exterior.jpg"
    structuredData={createWebPageSchema({
      path: "/socialHousingRL",
      name: "Social Housing Repair & Leasing Projects",
      description: repairLeaseDescription,
      image: "/images/social_housing_r_l/dolphin_road/6 Dolphin Road Exterior.jpg",
    })}
  >
    <TopSection />
  </Layout>
);

export default SocialHouseRLPage;