

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight } from "react-icons/fa";

const projects = [
  // Current Projects
  {
    id: 1,
    title: "Commercial Conversion - Social Housing Apartments",
    description: "Converting commercial buildings into modern social housing apartments with full amenities and sustainable features.",
    image: "/images/home_middle/house_construct.jpg",
    location: "Nationwide",
    status: "In Progress",
    category: "current",
    type: "Commercial Conversion",
    completionDate: "On-going",
    units: "20 Apartments",
    link: "/commercialResidential"
  },
  {
    id: 2,
    title: "Social Housing - Repair & Lease",
    description: "Comprehensive repair and lease program providing quality housing solutions through property rehabilitation.",
    image: "/images/home_middle/renovation.jpg",
    location: "Nationwide",
    status: "In Progress",
    category: "current",
    type: "Repair & Lease",
    completionDate: "Ongoing",
    units: "15+ Properties",
    link: "/socialHousingRL"
  },
  // Completed Projects
  {
    id: 3,
    title: "Emergency Accommodation Center",
    description: "Rapid deployment housing solution providing immediate shelter and support services for families in need.",
    image: "/images/home_middle/service.jpg",
    location: "Nationwide",
    status: "Completed",
    category: "completed",
    type: "Emergency Housing",
    completionDate: "2023",
    units: "100 Beds",
    link: "/emergencyHousing"
  },
  {
    id: 4,
    title: "Social Housing - Long Term Lease",
    description: "Long-term lease housing program creating stable, affordable homes for families and individuals.",
    image: "/images/home_middle/prop_services.jpg",
    location: "Nationwide",
    status: "Completed",
    category: "completed",
    type: "Long Term Lease",
    completionDate: "2022",
    units: "45 Properties",
    link: "/socialHousing"
  },
  // Additional Portfolio Projects
  // {
  //   id: 5,
  //   title: "Ballymahon Property Transformation",
  //   description: "Complete refurbishment of residential property including modern kitchen, bathroom, and electrical upgrades.",
  //   image: "/images/ballymahon/front_of_ballymahon.png",
  //   location: "Ballymahon, County Longford",
  //   status: "Completed",
  //   category: "refurbishment",
  //   type: "Property Refurbishment",
  //   completionDate: "2023",
  //   units: "Single Family Home"
  // },
  // {
  //   id: 6,
  //   title: "Wexford Residential Development",
  //   description: "Modern residential development featuring contemporary design and energy-efficient construction.",
  //   image: "/images/wexford/dining.jpg",
  //   location: "Wexford Town",
  //   status: "Completed",
  //   category: "refurbishment",
  //   type: "Residential Development",
  //   completionDate: "2023",
  //   units: "Multiple Units"
  // }
];

const categories = [
  { id: "all", label: "All Projects", count: projects.length },
  { id: "current", label: "Current Projects", count: projects.filter(p => p.category === "current").length },
  { id: "completed", label: "Completed Projects", count: projects.filter(p => p.category === "completed").length },
];

export const MiddleSection = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync category from query string (e.g., ?category=current)
  useEffect(() => {
    const q = (router.query?.category as string) || "";
    if (q && ["all", "current", "completed", "refurbishment"].includes(q)) {
      setSelectedCategory(q);
    }
  }, [router.query?.category]);

  const filteredProjects = useMemo(() => (
    selectedCategory === "all"
      ? projects
      : projects.filter(project => project.category === selectedCategory)
  ), [selectedCategory]);

  return (
    <section id="portfolio" className="bg-gray-50 py-20 px-6 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Project{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our diverse range of housing projects, from ongoing developments to completed transformations.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                const url = {
                  pathname: "/projects",
                  query: { category: category.id },
                  hash: "portfolio",
                } as const;
                // Update URL without full reload
                router.push(url, undefined, { shallow: true });
                // Smooth scroll to portfolio section if not in view
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  project.status === "In Progress" 
                    ? "bg-yellow-500 text-white" 
                    : "bg-green-500 text-white"
                }`}>
                  {project.status}
                </div>

                {/* Project Type */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {project.type}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {project.completionDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaTag className="mr-2 text-blue-500" />
                    {project.units}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                {project.link ? (
                  <Link href={project.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <span>View Project Details</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Project Details</span>
                    <FaArrowRight />
                  </motion.button>
                )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};