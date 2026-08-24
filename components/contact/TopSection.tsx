"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function TopSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen pt-20 sm:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-10 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home_middle/client_focus.jpg"
          alt="Contact Buildrex Construction"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to transform your property? Contact our expert team for a consultation and discover how we can bring your vision to life.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaPhone className="text-xl sm:text-2xl md:text-3xl text-blue-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Call Us</h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">Ready to help</p>
            <p className="text-white font-medium text-xs sm:text-sm">+353 87 604 6335</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaEnvelope className="text-xl sm:text-2xl md:text-3xl text-green-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Email Us</h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">Quick response</p>
            <p className="text-white font-medium text-xs sm:text-sm">nathan@buildrex.ie</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaMapMarkerAlt className="text-xl sm:text-2xl md:text-3xl text-red-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Visit Us</h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">Serving</p>
            <p className="text-white font-medium text-xs sm:text-sm">All of Ireland</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaClock className="text-xl sm:text-2xl md:text-3xl text-yellow-400 mx-auto mb-2 sm:mb-3 md:mb-4" />
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">Support</h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3">Always available</p>
            <p className="text-white font-medium text-xs sm:text-sm">24/7 Service</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-12"
        >
          <a
            href="#contact-form"
            className="inline-flex mb-10 items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Send us a Message
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
