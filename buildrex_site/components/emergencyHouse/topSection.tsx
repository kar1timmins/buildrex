"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {projects_emergency_accomodation} from "../../common/constants";

export default function TopSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 pt-24 sm:pt-32 md:pt-28">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-6 sm:mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gallery of Works
      </motion.h1>

      <div className="container mx-auto max-w-6xl">
        {projects_emergency_accomodation.map((project, index) => (
          <motion.div
            key={index}
            className="mb-8 sm:mb-12 md:mb-16 p-3 sm:p-4 md:p-6 lg:p-8 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-3 sm:mb-4">{project.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-4 sm:mb-6">{project.description}</p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center mb-3 sm:mb-4">Before</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {project.beforeImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-full h-40 sm:h-48 md:h-60 rounded-lg overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center mb-3 sm:mb-4">After</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {project.afterImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-full h-40 sm:h-48 md:h-60 rounded-lg overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={() => setSelectedImage(null)}>
          <motion.div
            className="relative p-4 bg-white rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button className="absolute top-4 right-4 text-gray-800 text-2xl" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={800}
              height={600}
              className="rounded-2xl object-cover max-w-full max-h-[90vh]"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
