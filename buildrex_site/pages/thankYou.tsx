// pages/thank-you.tsx
import React from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaPhone, FaEnvelope, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { createWebPageSchema } from "../common/seoConfig";

const thankYouDescription =
  "Thank you for contacting Buildrex Construction. A member of our team will review your enquiry about refurbishment or emergency accommodation services shortly.";

export default function ThankYou() {
  const router = useRouter();
  const [messageType, setMessageType] = useState<'success' | 'fallback' | 'direct'>('direct');

  useEffect(() => {
    if (router.query.success === 'true') {
      setMessageType('success');
    } else if (router.query.fallback === 'true') {
      setMessageType('fallback');
    } else {
      // If accessed directly without form submission, show a different message
      setMessageType('direct');
    }
  }, [router.query]);

  const getTitle = () => {
    switch (messageType) {
      case 'success':
        return "Thank You for Contacting Us!";
      case 'fallback':
        return "Message Received!";
      case 'direct':
        return "Get In Touch With Us!";
      default:
        return "Thank You for Contacting Us!";
    }
  };

  const getDescription = () => {
    switch (messageType) {
      case 'success':
        return "Your message has been successfully sent. Our team at Buildrex Construction will review your inquiry and get back to you within 24 hours.";
      case 'fallback':
        return "We've noted your message details. Due to a temporary technical issue, please also contact us directly using the information below to ensure we receive your inquiry.";
      case 'direct':
        return "Ready to start your construction project? We'd love to hear from you! Use any of the contact methods below to get in touch with our experienced team.";
      default:
        return "Your message has been successfully sent. Our team at Buildrex Construction will review your inquiry and get back to you within 24 hours.";
    }
  };

  const getIcon = () => {
    switch (messageType) {
      case 'success':
        return <FaCheckCircle className="text-6xl text-green-500 mx-auto" />;
      case 'fallback':
        return <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto" />;
      case 'direct':
        return <FaPhone className="text-6xl text-blue-500 mx-auto" />;
      default:
        return <FaCheckCircle className="text-6xl text-green-500 mx-auto" />;
    }
  };

  return (
    <Layout
      title="Thank You | Buildrex Construction"
      description={thankYouDescription}
      noindex
      structuredData={createWebPageSchema({
        path: "/thankYou",
        name: "Enquiry Confirmation | Buildrex Construction",
        description: thankYouDescription,
      })}
    >
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              {getIcon()}
            </motion.div>

            {/* Thank You Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {getTitle()}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {getDescription()}
            </p>

            {/* What's Next Section - Only show for successful submissions */}
            {messageType === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">What Happens Next?</h2>
                
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Quick Response</h3>
                      <p className="text-gray-600 text-sm">We'll review your message and respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Personal Consultation</h3>
                      <p className="text-gray-600 text-sm">Schedule a call to discuss your project requirements</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Project Planning</h3>
                      <p className="text-gray-600 text-sm">Develop a customized solution for your needs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Information - Always show */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: messageType === 'success' ? 0.8 : 0.6 }}
              className={`${messageType === 'fallback' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-blue-700'} text-white rounded-2xl p-6 mb-8`}
            >
              <h3 className="text-xl font-semibold mb-4">
                {messageType === 'fallback' ? 'Please Contact Us Directly' : messageType === 'direct' ? 'Contact Information' : 'Need Immediate Assistance?'}
              </h3>
              <p className="mb-4">
                {messageType === 'fallback' 
                  ? 'To ensure we receive your inquiry, please contact us using the details below:'
                  : messageType === 'direct'
                  ? 'Get in touch with our experienced team:'
                  : 'For urgent property issues or emergency accommodation needs:'
                }
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaPhone />
                  <span className="font-medium">+353 87 604 6335</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <span className="font-medium">nathan@buildrex.ie</span>
                </div>
              </div>
              {messageType !== 'direct' && (
                <p className="text-sm mt-3 opacity-90">Available 24/7 for emergency situations</p>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: messageType === 'success' ? 1.0 : 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                  <FaArrowLeft />
                  Back to Home
                </button>
              </Link>
              
              <Link href="/projects">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                  View Our Projects
                </button>
              </Link>

              {messageType === 'direct' && (
                <Link href="/contact">
                  <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                    Send Message
                  </button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
