"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function BottomSection() {
  const stats = [
    { number: "10+", label: "Years in Business" },
    { number: "150+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Buildrex</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            With over 10 years of experience in the construction industry, we've built a reputation for excellence and reliability
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</h3>
                <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <h3 className="text-3xl font-bold mb-6 text-blue-400">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To provide exceptional construction and property management services that transform communities across Ireland. We are committed to quality, innovation, and building lasting relationships with our clients and partners.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-green-400">Our Values</h3>
            <ul className="space-y-3 text-lg text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Quality craftsmanship in every project
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Transparent communication and honest pricing
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Sustainable and environmentally conscious practices
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Community-focused development
              </li>
            </ul>
          </div>
        </motion.div> */}

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-lg text-gray-300">
              Get in touch with our team today to discuss your construction and property management needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <FaPhone className="text-2xl text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Phone</h4>
              <p className="text-gray-300">+353 87 604 6335</p>
            </div>
            <div className="text-center">
              <FaEnvelope className="text-2xl text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-gray-300">nathan@buildrex.ie</p>
            </div>
            <div className="text-center">
              <FaMapMarkerAlt className="text-2xl text-red-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-gray-300">Ireland</p>
            </div>
            <div className="text-center">
              <FaClock className="text-2xl text-yellow-400 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Support</h4>
              <p className="text-gray-300">24/7 Available</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us Today
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
