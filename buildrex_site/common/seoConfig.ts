export const siteMetadata = {
  siteUrl: "https://www.buildrex.ie",
  siteName: "Buildrex Construction",
  defaultTitle: "Buildrex Construction | Social Housing & Property Refurbishments",
  defaultTitleTemplate: "%s | Buildrex Construction",
  defaultDescription:
    "Buildrex Construction delivers social housing refurbishments, emergency accommodation fit-outs, and property management services across Ireland.",
  defaultImage: "/images/hero/background_photo.jpg",
  phoneNumber: "+353 87 604 6335",
  email: "nathan@buildrex.ie",
  areaServed: "Ireland",
  logoPath: "/logo-icon-512.png",
  sameAs: [
    "https://ie.linkedin.com/in/nathan-timmins-564a852b1"
  ],
  services: [
    {
      name: "Social Housing Refurbishments",
      description:
        "Turnkey refurbishment and project management for social housing and leasing schemes across Ireland."
    },
    {
      name: "Emergency Accommodation Delivery",
      description:
        "Rapid delivery of compliant emergency accommodation, including fire, disability, and building control upgrades."
    },
    {
      name: "Property Maintenance Services",
      description:
        "Scheduled maintenance, 24/7 support, and compliance management for residential and commercial property portfolios."
    }
  ]
};

const toAbsoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${siteMetadata.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

type StructuredNode = Record<string, unknown>;

export const generateOrganizationSchema = (): StructuredNode => ({
  "@type": "Organization",
  "@id": `${siteMetadata.siteUrl}#organization`,
  name: siteMetadata.siteName,
  url: siteMetadata.siteUrl,
  description: siteMetadata.defaultDescription,
  logo: toAbsoluteUrl(siteMetadata.logoPath),
  email: siteMetadata.email,
  telephone: siteMetadata.phoneNumber,
  areaServed: {
    "@type": "Country",
    name: siteMetadata.areaServed
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteMetadata.phoneNumber,
      email: siteMetadata.email,
      areaServed: siteMetadata.areaServed,
      availableLanguage: ["English"]
    }
  ],
  sameAs: siteMetadata.sameAs
});

export const generateWebsiteSchema = (): StructuredNode => ({
  "@type": "WebSite",
  "@id": `${siteMetadata.siteUrl}#website`,
  url: siteMetadata.siteUrl,
  name: siteMetadata.siteName,
  description: siteMetadata.defaultDescription,
  publisher: {
    "@id": `${siteMetadata.siteUrl}#organization`
  }
});

export const generateSiteNavigationSchema = (): StructuredNode => ({
  "@type": "ItemList",
  "@id": `${siteMetadata.siteUrl}#sitenavigation`,
  name: "Buildrex Construction Main Navigation",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "About Buildrex Construction",
      description: "Leading construction and project management specialists delivering social housing and emergency accommodation across Ireland.",
      url: `${siteMetadata.siteUrl}/about`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Contact Buildrex Construction",
      description: "Speak with Buildrex Construction about social housing refurbishments, emergency accommodation delivery, and nationwide property maintenance support.",
      url: `${siteMetadata.siteUrl}/contact`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Social Housing",
      description: "See how Buildrex Construction revitalises properties for social housing leasing schemes through compliant refurbishments and turnkey delivery.",
      url: `${siteMetadata.siteUrl}/socialHousing`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Commercial To Residential",
      description: "View Buildrex Construction projects converting commercial buildings into high-quality residential and social housing spaces across Ireland.",
      url: `${siteMetadata.siteUrl}/commercialResidential`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "Emergency Housing",
      description: "Explore Buildrex Construction's emergency accommodation fit-outs, delivering compliant, fast-turnaround housing across Ireland.",
      url: `${siteMetadata.siteUrl}/emergencyHousing`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Projects Portfolio",
      description: "Browse Buildrex Construction's portfolio covering social housing refurbishments, commercial-to-residential conversions, and emergency accommodation builds across Ireland.",
      url: `${siteMetadata.siteUrl}/projects`,
    },
  ],
});

export const generateServiceSchemas = (): StructuredNode[] =>
  siteMetadata.services.map((service, index) => ({
    "@type": "Service",
    "@id": `${siteMetadata.siteUrl}#service-${index + 1}`,
    name: service.name,
    description: service.description,
    provider: {
      "@id": `${siteMetadata.siteUrl}#organization`
    },
    areaServed: {
      "@type": "Country",
      name: siteMetadata.areaServed
    }
  }));

export const absoluteUrl = toAbsoluteUrl;

type WebPageSchemaOptions = {
  path: string;
  name: string;
  description: string;
  image?: string;
};

export const createWebPageSchema = ({
  path,
  name,
  description,
  image,
}: WebPageSchemaOptions): StructuredNode => {
  const pageUrl = absoluteUrl(path);
  const schema: StructuredNode = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteMetadata.siteUrl}#website`,
    },
  };

  if (image) {
    schema["primaryImageOfPage"] = {
      "@type": "ImageObject",
      url: absoluteUrl(image),
    };
  }

  return schema;
};
