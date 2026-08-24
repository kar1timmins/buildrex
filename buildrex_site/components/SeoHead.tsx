import Head from "next/head";
import { absoluteUrl, generateOrganizationSchema, generateServiceSchemas, generateSiteNavigationSchema, generateWebsiteSchema, siteMetadata } from "../common/seoConfig";

export type StructuredData = Record<string, unknown> | Record<string, unknown>[];

type SeoHeadProps = {
  title?: string;
  description?: string;
  url?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: StructuredData;
  noindex?: boolean;
};

const toArray = (data?: StructuredData) => {
  if (!data) return [] as Record<string, unknown>[];
  return Array.isArray(data) ? data : [data];
};

const uniqueGraph = (nodes: Record<string, unknown>[]) => {
  const seen = new Set<string>();
  const graph: Record<string, unknown>[] = [];

  nodes.forEach((node) => {
    if (!node || typeof node !== "object") return;
    const id = typeof node["@id"] === "string" ? (node["@id"] as string) : undefined;
    if (id && seen.has(id)) return;
    if (id) {
      seen.add(id);
    }
    graph.push(node);
  });

  return graph;
};

const SeoHead = ({
  title,
  description,
  url,
  canonical,
  image,
  type = "website",
  structuredData,
  noindex,
}: SeoHeadProps) => {
  const metaTitle = title ?? siteMetadata.defaultTitle;
  const metaDescription = description ?? siteMetadata.defaultDescription;
  const pageUrl = url ?? siteMetadata.siteUrl;
  const canonicalUrl = canonical ?? pageUrl;
  const metaImage = absoluteUrl(image ?? siteMetadata.defaultImage);
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  const baseGraph = uniqueGraph([
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateSiteNavigationSchema(),
    ...generateServiceSchemas(),
    ...toArray(structuredData),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    ...(baseGraph.length === 1 ? baseGraph[0] : { "@graph": baseGraph }),
  };

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" type="image/png" href="/logo-updated.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo-updated.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/images/favicons/android-chrome-512x512.png" />
      <link rel="manifest" href="/images/favicons/site.webmanifest" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
};

export default SeoHead;
