"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRecaptchaAction, RECAPTCHA_ACTIONS } from "../../utils/recaptcha";
import { FaBuildingCircleCheck, FaUsers, FaWrench, FaAward } from "react-icons/fa6";

export default function TopSection() {
  const { executeAction } = useRecaptchaAction();

  const handleCTAClick = (ctaType: string) => {
    executeAction(`${RECAPTCHA_ACTIONS.BUTTON_CLICK}_cta_${ctaType}`);
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen pt-32 pb-16 sm:pb-20 md:pb-24 px-3 md:px-6 lg:px-10 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/background_photo.jpg"
          alt="Buildrex Construction - Premier Property Development"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 text-center max-w-4xl mx-auto px-2 md:px-4 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent leading-tight">
            Buildrex Construction
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-3 md:mb-4">
            Buildrex Construction partners with local authorities, housing bodies, and property owners to convert vacant assets into safe, compliant homes across Ireland.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            We specialise in social housing refurbishments, emergency accommodation delivery, and 24/7 property maintenance, providing turnkey project management from survey to handover.
          </p>
        </motion.div>

        {/* Key Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 mt-6 md:mt-8 lg:mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaBuildingCircleCheck className="text-lg md:text-2xl lg:text-3xl text-blue-400 mx-auto mb-1 md:mb-2 lg:mb-3" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">150+</h3>
            <p className="text-xs md:text-sm text-gray-300">Projects Completed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaUsers className="text-lg md:text-2xl lg:text-3xl text-green-400 mx-auto mb-1 md:mb-2 lg:mb-3" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">10+</h3>
            <p className="text-xs md:text-sm text-gray-300">Years Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaAward className="text-lg md:text-2xl lg:text-3xl text-yellow-400 mx-auto mb-1 md:mb-2 lg:mb-3" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">100%</h3>
            <p className="text-xs md:text-sm text-gray-300">Quality Assured</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaWrench className="text-lg md:text-2xl lg:text-3xl text-red-400 mx-auto mb-1 md:mb-2 lg:mb-3" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold">24/7</h3>
            <p className="text-xs md:text-sm text-gray-300">Support Available</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 lg:mt-12"
        >
          <Link
            href="/projects"
            onClick={() => handleCTAClick('view_work')}
            className="inline-flex items-center justify-center px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            onClick={() => handleCTAClick('get_quote')}
            className="inline-flex items-center justify-center px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-md text-sm md:text-base"
          >
            Get Quote
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - Mobile responsive, centered, non-interactive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="pointer-events-none absolute inset-x-0 hidden sm:flex justify-center bottom-3 sm:bottom-4 md:bottom-6"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/70 rounded-full flex justify-center items-start">
          <motion.div
            animate={{ y: [2, 10, 2] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-0.5 sm:w-1 h-3 bg-white/80 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
