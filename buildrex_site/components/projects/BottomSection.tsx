

"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUsers, FaHome, FaClipboardCheck, FaCog, FaPhone, FaEnvelope } from "react-icons/fa";

const projectStats = [
  { icon: <FaHome />, number: "150+", label: "Properties Delivered" },
  { icon: <FaUsers />, number: "200+", label: "Families Housed" },
  { icon: <FaClipboardCheck />, number: "100%", label: "On-Time Completion" },
  { icon: <FaCog />, number: "10+", label: "Years Experience" }
];

const services = [
  {
    title: "Project Development",
    description: "From initial planning to final delivery, we manage every aspect of your housing project.",
    features: ["Site Assessment", "Planning Permission", "Construction Management", "Quality Assurance"]
  },
  {
    title: "Property Refurbishment",
    description: "Complete transformation of existing properties to modern standards and specifications.",
    features: ["Structural Renovations", "Energy Efficiency Upgrades", "Modern Amenities", "Compliance Updates"]
  },
  {
    title: "Housing Solutions",
    description: "Specialized housing programs tailored to community needs and social requirements.",
    features: ["Social Housing", "Emergency Accommodation", "Long-term Leasing", "Community Development"]
  }
];

export const BottomSection = () => {
  return (
    <section className="bg-white py-20">
      {/* Project Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 mb-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Our Project Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {projectStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="space-y-3 group flex flex-col items-center justify-center text-center"
              >
                <div className="text-4xl text-blue-200 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services Overview */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Our Project{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Services
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive housing solutions from concept to completion, tailored to meet diverse community needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-100 py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your Next Project?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our experienced team to discuss your housing project requirements and discover how we can bring your vision to life.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <FaPhone className="text-blue-500" />
              <span>+353 87 604 6335</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FaEnvelope className="text-blue-500" />
              <span>nathan@buildrex.ie</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
              >
                Start Your Project
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Learn More About Us
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};