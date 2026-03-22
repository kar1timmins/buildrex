"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaAward, FaHandshake, FaTimes, FaPhone, FaCopy } from "react-icons/fa";

export default function BottomSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const phoneNumber = "+353 87 604 6335";

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      console.log('Modal opened');
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      console.log('Modal closed');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
  };

  const locations = [
    { city: "Dublin", description: "Serving the greater Dublin area" },
    { city: "Cork", description: "Construction services in Cork region" },
    { city: "Galway", description: "Property management in Galway" },
    { city: "Limerick", description: "Emergency housing solutions" },
    { city: "Waterford", description: "Refurbishment specialists" },
    { city: "Nationwide", description: "Available across all of Ireland" }
  ];

  const features = [
    {
      icon: <FaClock className="text-4xl text-blue-600" />,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours and provide free consultations for all projects."
    },
    {
      icon: <FaAward className="text-4xl text-green-600" />,
      title: "Quality Assured",
      description: "All our work is backed by comprehensive warranties and meets the highest industry standards."
    },
    {
      icon: <FaHandshake className="text-4xl text-purple-600" />,
      title: "Trusted Partner",
      description: "Building long-term relationships with clients across Ireland through reliable service delivery."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Service Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Service <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Areas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            We provide comprehensive construction and property management services across Ireland
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <FaMapMarkerAlt className="text-2xl text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-lg mb-1">{location.city}</h3>
                <p className="text-gray-400 text-sm">{location.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you need emergency accommodation, property refurbishment, or ongoing maintenance services, 
            our team is ready to help. Contact us today for a free consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
            {/* Mobile: Clickable phone link - Only shows on mobile (below 640px) */}
            <a
              href="tel:+353876046335"
              className="w-full max-w-[280px] block sm:hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center min-h-[56px] flex items-center justify-center px-4 py-4"
              onClick={() => console.log('=== MOBILE PHONE LINK CLICKED ===')}
            >
              <span className="text-sm">📱 Mobile Call Now</span>
            </a>
            
            {/* Desktop: Clickable button to open modal - Only shows on desktop (640px and above) */}
            <button
              type="button"
              onClick={() => {
                console.log('=== DESKTOP BUTTON CLICKED ===');
                console.log('Current modal state:', isModalOpen);
                setIsModalOpen(true);
                console.log('Modal state should now be true');
              }}
              className="w-full max-w-[280px] sm:w-auto sm:max-w-none hidden sm:flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[56px]"
            >
              <FaPhone className="mr-2" />
              <span className="text-sm md:text-base">🖥️ Desktop Call Now</span>
            </button>
            
            <span className="text-gray-400 hidden sm:inline">or</span>
            
            <Link
              href="/projects"
              className="w-full max-w-[280px] sm:w-auto sm:max-w-none inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 text-center min-h-[56px]"
            >
              <span className="text-sm sm:text-sm md:text-base">View Our Projects</span>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Emergency services available 24/7 • Licensed and insured • Serving all of Ireland
            </p>
          </div>
        </motion.div>
      </div>

      {/* Phone Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Call Buildrex</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="text-center">
              <FaPhone className="text-4xl text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">Ready to discuss your project? Give us a call!</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-2xl font-bold text-gray-900 mb-2">{phoneNumber}</p>
                <p className="text-sm text-gray-600">Available 24/7 for emergencies</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+353876046335"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FaPhone className="mr-2" />
                  Call Now
                </a>
                
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <FaCopy className="mr-2" />
                  {copySuccess ? 'Copied!' : 'Copy Number'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
