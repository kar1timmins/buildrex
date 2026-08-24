import Layout from "../components/Layout";
import TopSection from "../components/homePage/topSection";
import MiddleSection from "../components/homePage/middleSection";
import BottomSection from "../components/homePage/bottomSection";
import BookingSection from "../components/homePage/contactSection";
import { createWebPageSchema } from "../common/seoConfig";

const homeDescription =
  "Buildrex Construction accelerates social housing refurbishments, emergency accommodation delivery, and property maintenance programmes nationwide.";

const IndexPage = () => (
  <Layout
    title="Buildrex Construction: Home"
    description={homeDescription}
    image="/images/hero/background_photo.jpg"
    structuredData={createWebPageSchema({
      path: "/",
      name: "Buildrex Construction Home",
      description: homeDescription,
      image: "/images/hero/background_photo.jpg",
    })}
  >
    <TopSection />
    <MiddleSection />
    <BottomSection />
    <BookingSection />
  </Layout>
);

export default IndexPage;
