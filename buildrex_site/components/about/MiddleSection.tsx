"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaHome, FaCog, FaLifeRing, FaClipboardList, FaCheckCircle } from "react-icons/fa";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  accent: string;
  bar: string;
  bullets?: string[];
};

const services: Service[] = [
  {
    icon: <FaHome className="text-2xl text-blue-600" />,
    title: "Refurbishments",
    description:
      "We have been involved in conjunction with various local authorities across Ireland for the provision of social housing. We specialise in Long-term leasing, the repair & lease scheme and are educated in all the planning exemptions available across Ireland.",
    image: "/images/home_middle/renovation.jpg",
    accent: "bg-blue-50",
    bar: "bg-blue-600",
  },
  {
    icon: <FaLifeRing className="text-2xl text-green-600" />,
    title: "Emergency Accommodation",
    description:
      "Buildrex project managed the delivery of several emergency accommodation centres across Ireland. We brought vacant commercial buildings up to today's regulations for fire, disability, and building control and provided a cert of completion to our client in record timing.",
    image: "/images/home_middle/house_construct.jpg",
    accent: "bg-green-50",
    bar: "bg-green-600",
  },
  {
    icon: <FaCog className="text-2xl text-purple-600" />,
    title: "Scheduled Maintenance",
    description:
      "Boiler maintenance, LD2 fire precautions system, fire alarm servicing, emergency lighting servicing, garden maintenance, property condition report etc. Buildrex construction management has a dedicated desk that can add value to clients.",
    image: "/images/home_middle/service.jpg",
    accent: "bg-purple-50",
    bar: "bg-purple-600",
    bullets: [
      "Logging issues, problems or defects",
      "Allocating and tracking jobs through to completion",
      "Managing workflow to ensure SLAs/KPIs are met",
      "Escalating complex or problematic requests",
      "Compiling data and insights",
    ],
  },
  {
    icon: <FaClipboardList className="text-2xl text-orange-600" />,
    title: "24/7 Support Services",
    description:
      "Buildrex support can offer an efficient and cost-effective way to deliver 24-7 support, meaning our clients get peace of mind from around-the-clock coverage whilst you benefit from timely and responsive support when and where it's needed.",
    image: "/images/home_middle/prop_services.jpg",
    accent: "bg-orange-50",
    bar: "bg-orange-500",
  },
];

export default function MiddleSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction and property management solutions tailored to meet your needs
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-16 md:space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-14`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${service.accent} shrink-0`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                {/* Accent bar */}
                <div className={`w-12 h-1 ${service.bar} rounded-full mb-4`} />

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {service.description}
                </p>

                {service.bullets && (
                  <ul className="mt-5 space-y-3">
                    {service.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-blue-600 mt-0.5 shrink-0 text-lg" />
                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
