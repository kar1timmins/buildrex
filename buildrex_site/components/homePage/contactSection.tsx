"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaCalendar, FaArrowRight, FaTimes, FaCopy } from "react-icons/fa";

const ContactSection = () => {
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
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Project?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Get in touch today and let us handle your property needs with expertise and care. 
            From emergency housing to full refurbishments, we're here to help.
          </p>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <FaPhone className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Call Us Now</h3>
              <p className="text-gray-400 mb-4">Speak directly with our team</p>
              
              {/* Mobile: Direct phone link */}
              <a 
                href="tel:+353876046335"
                className="block sm:hidden text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 text-center"
                onClick={() => console.log('=== HOME MOBILE PHONE LINK CLICKED ===')}
              >
                {phoneNumber}
              </a>
              
              {/* Desktop: Button to open modal */}
              <button
                onClick={() => {
                  console.log('=== HOME DESKTOP BUTTON CLICKED ===');
                  setIsModalOpen(true);
                }}
                className="hidden sm:block text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 cursor-pointer text-center w-full"
              >
                {phoneNumber}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <FaEnvelope className="text-4xl text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-gray-400 mb-4">Get a detailed response</p>
              <a 
                href="mailto:nathan@buildrex.ie"
                className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
              >
                nathan@buildrex.ie
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <FaCalendar className="text-4xl text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Book Consultation</h3>
              <p className="text-gray-400 mb-4">Schedule a meeting</p>
              <Link 
                href="/contact"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
              >
                Schedule Now
              </Link>
            </motion.div>
          </div>

          {/* Main CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Free Quote
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-md"
            >
              View Our Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Licensed & Insured • Serving All of Ireland • 10+ Years Experience • 24/7 Support Available
          </p>
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
};

export default ContactSection;
