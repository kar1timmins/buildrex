"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const MiddleSection = () => {
  const expertiseAreas = [
    {
      title: "Transforming Spaces",
      content:
        "We work across Ireland, specializing in converting vacant commercial and residential properties into social housing and emergency accommodation.",
      image: "/images/home_middle/transform_space_3.jpg",
      link: "/projects"
    },
    {
      title: "Bringing Homes to Life",
      content:
        "Buildrex has completed 150+ social housing refurbishments across Ireland, revitalizing vacant homes for future generations.",
      image: "/images/home_middle/renovation.jpg",
      link: "/projects"
    },
    {
      title: "Gov Dept & LA Submission",
      content:
        "Buildrex has project managed emergency accommodation contracts and 25-year local authority leases for social housing.",
      image: "/images/home_middle/prop_services.jpg",
      link: "/contact"
    },
    {
      title: "Expert Construction Teams",
      content:
        "Our experienced partnership teams handle construction and refurbishment projects of all sizes.",
      image: "/images/home_middle/team.jpg",
      link: "/about"
    },
    {
      title: "End-to-End Service",
      content:
        "From purchase to renovation and handover, we provide a full A-Z property service to our clients.",
      image: "/images/home_middle/service.jpg",
      link: "/projects"
    },
    {
      title: "Client-Focused Management",
      content:
        "We ensure top-tier property management at cost-effective rates, always prioritizing client needs.",
      image: "/images/home_middle/client_focus.jpg",
      link: "/contact"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering comprehensive construction and property management solutions across Ireland
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                  {area.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiddleSection;
