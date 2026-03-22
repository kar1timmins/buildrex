import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { absoluteUrl, siteMetadata } from "../common/seoConfig";
import SeoHead, { StructuredData } from "./SeoHead";
import { useRecaptchaAction, RECAPTCHA_ACTIONS } from "../utils/recaptcha";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  structuredData?: StructuredData;
  noindex?: boolean;
};

const Layout = ({
  children,
  title = siteMetadata.defaultTitle,
  description,
  image,
  canonical,
  structuredData,
  noindex,
}: Props) => {
  const router = useRouter();
  const { executeAction } = useRecaptchaAction();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine page background and text colors
  const lightBackgroundPages = ['/contact', '/about', '/projects', '/thankYou', '/socialHousingRL', '/commercialResidential', '/emergencyHousing', '/socialHousing'];
  const isLightBackground = lightBackgroundPages.includes(router.pathname);
  // Show white nav when on a light-background page OR when scrolled past the hero on dark pages
  const showSolidNav = isLightBackground || isScrolled;
  const shouldUseDarkText = showSolidNav;

  const sanitizedPath = router.asPath?.split("#")[0]?.split("?")[0] ?? "/";
  const pageUrl = absoluteUrl(sanitizedPath === "/" ? "/" : sanitizedPath);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state
      setIsScrolled(currentScrollY > 50);
      
      // Update navbar visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (destination: string) => {
    executeAction(`${RECAPTCHA_ACTIONS.NAVIGATION}_${destination}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    executeAction(`${RECAPTCHA_ACTIONS.BUTTON_CLICK}_mobile_menu_${!isMenuOpen ? 'open' : 'close'}`);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SeoHead
        title={title}
        description={description}
        image={image}
        url={pageUrl}
        canonical={canonical ?? pageUrl}
        structuredData={structuredData}
        noindex={noindex}
      />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      } ${showSolidNav ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm'}`}>
        <nav className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0" aria-label="Buildrex Construction — Home">
            <Image
              src="/logo-updated.png"
              alt="Buildrex Construction"
              width={180}
              height={98}
              priority
              quality={90}
              className="h-10 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" onClick={() => handleNavClick('home')} className={`py-2 px-3 transition font-medium ${
              router.pathname === "/" 
                ? `font-bold border-b-2 ${shouldUseDarkText ? "border-gray-800 text-gray-800" : "border-white text-white"}` 
                : `${shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-white drop-shadow-lg hover:text-blue-200"}`
            }`}>Home</Link>

            {/* Projects Portfolio Link */}
            <Link href="/projects" onClick={() => handleNavClick('projects')} className={`py-2 px-3 transition font-medium ${
              router.pathname === "/projects" 
                ? `font-bold border-b-2 ${shouldUseDarkText ? "border-gray-800 text-gray-800" : "border-white text-white"}` 
                : `${shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-white drop-shadow-lg hover:text-blue-200"}`
            }`}>Projects</Link>

            <Link href="/about" onClick={() => handleNavClick('about')} className={`py-2 px-3 transition font-medium ${
              router.pathname === "/about" 
                ? `font-bold border-b-2 ${shouldUseDarkText ? "border-gray-800 text-gray-800" : "border-white text-white"}` 
                : `${shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-white drop-shadow-lg hover:text-blue-200"}`
            }`}>About</Link>
            <Link href="/contact" onClick={() => handleNavClick('contact')} className={`py-2 px-3 transition font-medium ${
              router.pathname === "/contact" 
                ? `font-bold border-b-2 ${shouldUseDarkText ? "border-gray-800 text-gray-800" : "border-white text-white"}` 
                : `${shouldUseDarkText ? "text-gray-700 hover:text-gray-900" : "text-white drop-shadow-lg hover:text-blue-200"}`
            }`}>Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className={`md:hidden z-50 transition-colors duration-300 ${
            shouldUseDarkText ? "text-gray-800" : "text-white drop-shadow-lg"
          }`}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Mobile Menu */}
          <div className={`fixed top-0 right-0 w-full h-screen flex flex-col items-center justify-center transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } ${shouldUseDarkText ? "bg-white text-gray-800" : "bg-gray-900 text-white"}`}>
            <ul className="space-y-6 text-2xl text-center">
              <li><Link href="/" onClick={(e) => { handleNavClick('home'); toggleMenu(); }} className={`transition-colors duration-300 ${
                shouldUseDarkText ? "hover:text-blue-600 hover:underline" : "hover:text-blue-200 hover:underline"
              }`}>Home</Link></li>

              {/* Projects Link */}
              <li><Link href="/projects" onClick={(e) => { handleNavClick('projects'); toggleMenu(); }} className={`transition-colors duration-300 ${
                shouldUseDarkText ? "hover:text-blue-600 hover:underline" : "hover:text-blue-200 hover:underline"
              }`}>Projects</Link></li>

              <li><Link href="/about" onClick={(e) => { handleNavClick('about'); toggleMenu(); }} className={`transition-colors duration-300 ${
                shouldUseDarkText ? "hover:text-blue-600 hover:underline" : "hover:text-blue-200 hover:underline"
              }`}>About</Link></li>
              <li><Link href="/contact" onClick={(e) => { handleNavClick('contact'); toggleMenu(); }} className={`transition-colors duration-300 ${
                shouldUseDarkText ? "hover:text-blue-600 hover:underline" : "hover:text-blue-200 hover:underline"
              }`}>Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer (now always at bottom) */}
      <footer className="w-full p-4 bg-white border-t border-gray-200 shadow-sm text-center dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          © 2026 Buildrex Construction™. All Rights Reserved.
        </span>
      </footer>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
