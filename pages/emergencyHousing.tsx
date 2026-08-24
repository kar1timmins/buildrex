import Layout from "../components/Layout";
import TopSection from "../components/emergencyHouse/topSection";
import { createWebPageSchema } from "../common/seoConfig";

const emergencyDescription =
  "Explore Buildrex Construction's emergency accommodation fit-outs, delivering compliant, fast-turnaround housing across Ireland.";

const EmergencyHousePage = () => (
  <Layout
    title="Emergency Housing | Buildrex Construction"
    description={emergencyDescription}
    image="/images/home_middle/house_construct.jpg"
    structuredData={createWebPageSchema({
      path: "/emergencyHousing",
      name: "Emergency Housing Projects",
      description: emergencyDescription,
      image: "/images/home_middle/house_construct.jpg",
    })}
  >
    <TopSection />
  </Layout>
);

export default EmergencyHousePage;