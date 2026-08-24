import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Bing site verification */}
        <meta name="msvalidate.01" content="0FFD2ADA9A1CAD52E3849D6744EF8765" />
        {/* Theme colour — browser chrome, Android, Windows */}
        <meta name="theme-color" content="#1e40af" />
        {/* Windows / Bing tile */}
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-TileImage" content="/images/favicons/android-chrome-192x192.png" />
        <meta name="msapplication-config" content="none" />
        {/* Google Fonts — Space Grotesk (headings) + Inter (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" 
        />
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
