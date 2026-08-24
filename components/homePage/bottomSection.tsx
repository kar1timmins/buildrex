"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaTools, FaClipboardCheck, FaFileAlt, FaPaintRoller } from "react-icons/fa";
import { GiGroundbreaker, GiChisel, GiBrickWall, GiGardeningShears } from "react-icons/gi";
import { MdOutlineElectricalServices, MdOutlinePlumbing, MdGridView } from "react-icons/md";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { GrSchedules } from "react-icons/gr";
import { LuNewspaper } from "react-icons/lu";
import { RiSurveyFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";

const services = [
  { icon: <FaFileAlt />, title: "BER certs & BER upgrades", color: "text-blue-600" },
  { icon: <GiBrickWall />, title: "Blockwork", color: "text-red-600" },
  { icon: <GiChisel />, title: "Carpentry Work", color: "text-amber-600" },
  { icon: <FaBuildingCircleCheck />, title: "Design and Build Services", color: "text-green-600" },
  { icon: <MdOutlineElectricalServices />, title: "Electrical Work", color: "text-yellow-600" },
  { icon: <GiGardeningShears />, title: "Garden Maintenance", color: "text-emerald-600" },
  { icon: <GiGroundbreaker />, title: "Grounds Works", color: "text-orange-600" },
  { icon: <MdGridView />, title: "Insulation", color: "text-indigo-600" },
  { icon: <FaPaintRoller />, title: "Painting & Decorating", color: "text-pink-600" },
  { icon: <LuNewspaper />, title: "Planning Applications", color: "text-cyan-600" },
  { icon: <MdOutlinePlumbing />, title: "Plumbing Work", color: "text-blue-500" },
  { icon: <FaTools />, title: "Project Management", color: "text-purple-600" },
  { icon: <RiSurveyFill />, title: "Property Surveys", color: "text-teal-600" },
  { icon: <HiDocumentReport />, title: "Compliance Reports", color: "text-slate-600" },
  { icon: <GrSchedules />, title: "Schedule of Works", color: "text-lime-600" },
];

const BottomSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
            What Buildrex <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Can Do</span> For You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive project management services covering every aspect of construction and property development
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-2 md:p-6 text-center border border-gray-100 hover:border-blue-200 hover:-translate-y-2 flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]"
            >
              <div className={`text-lg md:text-3xl ${service.color} mb-1 md:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h4 className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-tight text-center px-1">
                {service.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              End-to-End Project Management
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From initial planning and design through to final completion, Buildrex provides comprehensive 
              project management services. Our experienced team ensures every aspect of your construction 
              project is handled with precision, quality, and attention to detail.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaClipboardCheck className="text-2xl text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Planning & Design</h4>
                <p className="text-sm text-gray-600">Comprehensive project planning and architectural design services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaTools className="text-2xl text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Construction</h4>
                <p className="text-sm text-gray-600">Expert construction and refurbishment services across all trades</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaBuildingCircleCheck className="text-2xl text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Completion</h4>
                <p className="text-sm text-gray-600">Quality assurance and project handover with full documentation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BottomSection;
