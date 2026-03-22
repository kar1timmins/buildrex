"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { FaUser, FaEnvelope, FaPhone, FaComments, FaPaperPlane, FaClock, FaShieldAlt } from "react-icons/fa";

export default function MiddleSection() {
  const router = useRouter();
  const { executeRecaptchaAction, isRecaptchaReady } = useRecaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Allow overriding the contact API endpoint for static hosting (e.g., register365)
  const CONTACT_ENDPOINT =
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Prevent multiple submissions
  if (isSubmitting) return;
  
  // Form validation
  if (!formData.name.trim()) {
    toast.error("Please enter your full name");
    return;
  }
  
  if (!formData.email.trim()) {
    toast.error("Please enter your email address");
    return;
  }
  
  if (!formData.message.trim()) {
    toast.error("Please enter your message");
    return;
  }

  // Check if reCAPTCHA v3 is ready
  if (!isRecaptchaReady) {
    toast.error("Security verification is loading. Please wait a moment and try again.");
    return;
  }

  setIsSubmitting(true);

  try {
    // Execute reCAPTCHA v3 (invisible background protection)
    const recaptchaV3Token = await executeRecaptchaAction('contact_form_submit');
    console.log('Generated reCAPTCHA v3 token:', recaptchaV3Token ? 'Token received' : 'No token');
    
    if (!recaptchaV3Token) {
      // Fallback: proceed without reCAPTCHA but warn user
      console.warn('reCAPTCHA token generation failed, proceeding with manual review');
      toast.error("Security verification unavailable. Your message will require manual review.");
    }

    const submissionData = {
      ...formData,
      recaptchaV3Token: recaptchaV3Token || 'fallback_mode',
      fallbackMode: !recaptchaV3Token
    };

    if (recaptchaV3Token) {
      console.log('Submitting form with token length:', recaptchaV3Token.length);
    }

  const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData)
    });

    const data = await res.json();

    if (res.ok) {
      // Success - show success toast and redirect
      toast.success("Message sent successfully! Redirecting...");
      setTimeout(() => {
        router.push("/thankYou?success=true");
      }, 1500);
    } else {
      // If the endpoint doesn't exist in production (static hosting), 404 may occur
      if (res.status === 404) {
        toast.error("Online form backend unavailable. Redirecting to fallback page.");
        setTimeout(() => {
          router.push("/thankYou?fallback=true");
        }, 1200);
        return;
      }
      // Handle validation errors from API
      if (data.error && (data.error.includes("timeout") || data.error.includes("connection"))) {
        // For timeout/connection errors, still redirect but inform user
        toast.error("Email system temporarily unavailable. Your message details have been noted.");
        setTimeout(() => {
          router.push("/thankYou?fallback=true");
        }, 2000);
      } else {
        toast.error(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    // Even on network error, redirect to thank you page with backup contact info
    toast.error("Network error occurred. Please contact us directly.");
    setTimeout(() => {
      router.push("/thankYou?fallback=true");
    }, 2000);
  }
};


  const services = [
    "Housing Refurbishments",
    "Emergency Accommodation",
    "Scheduled Maintenance",
    "Property Management",
    "Construction Services",
    "24/7 Support Services",
    "Consultation"
  ];

  return (
    <section id="contact-form" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Start Your <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Project Today</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Fill out the form below and our team will get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+353 xx xxx xxxx"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <FaComments className="absolute left-3 top-4 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
              </div>

              {/* reCAPTCHA v3 Protection (Invisible) */}
              <div className="flex justify-center">
                <p className="text-xs text-gray-500 text-center max-w-full">
                  <FaShieldAlt className="inline mr-1" />
                  Protected by reCAPTCHA v3 • <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy</a> • <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Terms</a>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                } text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-3`}
              >
                <FaPaperPlane />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Buildrex?</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Team</h4>
                    <p className="text-gray-600">Over 10 years of experience in construction and property management across Ireland.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quick Response</h4>
                    <p className="text-gray-600">We respond to all inquiries promptly and provide detailed project timelines.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaComments className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                    <p className="text-gray-600">Round-the-clock support for all your property management and emergency needs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4">Emergency Contact</h4>
              <p className="text-gray-700 mb-3 sm:mb-4">For urgent property issues or emergency accommodation needs:</p>
              <div className="space-y-2">
                <p className="font-medium text-blue-800">📞 +353 87 604 6335</p>
                <p className="font-medium text-blue-800">📧 nathan@buildrex.ie</p>
              </div>
              <p className="text-sm text-gray-600 mt-3">Available 24/7 for emergency situations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
