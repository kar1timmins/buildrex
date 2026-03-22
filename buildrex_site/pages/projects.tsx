import Layout from "../components/Layout";
import { TopSection } from "../components/projects/TopSection";
import { MiddleSection } from "../components/projects/MiddleSection";
import { BottomSection } from "../components/projects/BottomSection";
import { createWebPageSchema } from "../common/seoConfig";

const projectsDescription =
  "Browse Buildrex Construction's portfolio covering social housing refurbishments, commercial-to-residential conversions, and emergency accommodation builds across Ireland.";

const ProjectsPage = () => (
  <Layout
    title="Projects Portfolio | Buildrex Construction"
    description={projectsDescription}
    image="/images/home_middle/street_view_refurb.jpg"
    structuredData={createWebPageSchema({
      path: "/projects",
      name: "Buildrex Construction Projects Portfolio",
      description: projectsDescription,
      image: "/images/home_middle/street_view_refurb.jpg",
    })}
  >
    <TopSection />
    <MiddleSection />
    <BottomSection />
  </Layout>
);

export default ProjectsPage;