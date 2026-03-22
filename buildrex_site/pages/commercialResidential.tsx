import Layout from "../components/Layout";
import TopAboutSection from "../components/commercialResidential/CommercialToResidential";
import { createWebPageSchema } from "../common/seoConfig";

const commercialDescription =
  "View Buildrex Construction projects converting commercial buildings into high-quality residential and social housing spaces across Ireland.";

const CommercialResidential = () => (
  <Layout
    title="Commercial To Residential | Buildrex Construction"
    description={commercialDescription}
    image="/images/home_middle/renovation.jpg"
    structuredData={createWebPageSchema({
      path: "/commercialResidential",
      name: "Commercial to Residential Projects",
      description: commercialDescription,
      image: "/images/home_middle/renovation.jpg",
    })}
  >
    <TopAboutSection />
  </Layout>
);

export default CommercialResidential;