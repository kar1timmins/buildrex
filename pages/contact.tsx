import Layout from "../components/Layout";
import TopSection from "../components/contact/TopSection";
import MiddleSection from "../components/contact/MiddleSection";
import BottomSection from "../components/contact/BottomSection";
import { createWebPageSchema } from "../common/seoConfig";

const contactDescription =
  "Speak with Buildrex Construction about social housing refurbishments, emergency accommodation delivery, and nationwide property maintenance support.";

const ContactPage = () => (
  <Layout
    title="Contact | Buildrex Construction"
    description={contactDescription}
    image="/images/home_middle/client_focus.jpg"
    structuredData={createWebPageSchema({
      path: "/contact",
      name: "Contact Buildrex Construction",
      description: contactDescription,
      image: "/images/home_middle/client_focus.jpg",
    })}
  >
    <TopSection />
    <MiddleSection />
    <BottomSection />
  </Layout>
);

export default ContactPage;