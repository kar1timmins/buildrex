"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBuilding, FaHome, FaTools, FaCog } from "react-icons/fa";

export const TopSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen pt-20 sm:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-10 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home_middle/street_view_refurb.jpg"
          alt="Construction Projects"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-4 font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            Our Projects Portfolio
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed px-4">
            Explore our comprehensive range of housing projects from current developments to completed transformations.
          </p>
        </motion.div>

        {/* Project Categories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 lg:mt-16 items-stretch"
        >
          <Link
            href={{ pathname: "/projects", query: { category: "current" }, hash: "portfolio" }}
            className="focus:outline-none block h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 cursor-pointer text-center group flex flex-col items-center justify-center h-full min-h-[140px] sm:min-h-[160px]"
            >
              <div className="mb-2 md:mb-3 transition-transform duration-300 ease-out group-hover:scale-110 flex items-center justify-center">
                <FaBuilding className="text-xl sm:text-2xl md:text-3xl text-blue-400" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold">Current Projects</h3>
              <p className="text-xs md:text-sm text-gray-300">Ongoing Developments</p>
            </motion.div>
          </Link>

          <Link
            href={{ pathname: "/projects", query: { category: "completed" }, hash: "portfolio" }}
            className="focus:outline-none block h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 cursor-pointer text-center group flex flex-col items-center justify-center h-full min-h-[140px] sm:min-h-[160px]"
            >
              <div className="mb-2 md:mb-3 transition-transform duration-300 ease-out group-hover:scale-110 flex items-center justify-center">
                <FaHome className="text-xl sm:text-2xl md:text-3xl text-green-400" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold">Completed</h3>
              <p className="text-xs md:text-sm text-gray-300">Finished Projects</p>
            </motion.div>
          </Link>

          <Link
            href={{ pathname: "/projects", query: { category: "all" }, hash: "portfolio" }}
            className="focus:outline-none block h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 cursor-pointer text-center group flex flex-col items-center justify-center h-full min-h-[140px] sm:min-h-[160px]"
            >
              <div className="mb-2 md:mb-3 transition-transform duration-300 ease-out group-hover:scale-110 flex items-center justify-center">
                <FaTools className="text-xl sm:text-2xl md:text-3xl text-orange-400" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold">Refurbishments</h3>
              <p className="text-xs md:text-sm text-gray-300">Property Transformations</p>
            </motion.div>
          </Link>

          <Link
            href={{ pathname: "/projects", query: { category: "all" }, hash: "portfolio" }}
            className="focus:outline-none block h-full"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 cursor-pointer text-center group flex flex-col items-center justify-center h-full min-h-[140px] sm:min-h-[160px]"
            >
              <div className="mb-2 md:mb-3 transition-transform duration-300 ease-out group-hover:scale-110 flex items-center justify-center">
                <FaCog className="text-xl sm:text-2xl md:text-3xl text-purple-400" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold">All Projects</h3>
              <p className="text-xs md:text-sm text-gray-300">Complete Portfolio</p>
            </motion.div>
          </Link>
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
            animate={{ y: [2, 12, 2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 sm:w-1 h-3 bg-white/80 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};