/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus(error instanceof Error ? 'error' : 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      variants={fadeIn}
      className="bg-gray-800 p-8 rounded-xl shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="hidden" 
          name="access_key" 
         value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
        />
        <input 
          type="hidden" 
          name="subject" 
          value="New Contact Form Submission from SynergiX Labs Website" 
        />
        <input 
          type="hidden" 
          name="from_name" 
          value="SynergiX Labs Website" 
        />
        <input 
          type="checkbox" 
          name="botcheck" 
          className="hidden" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="FullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="FullName"
              id="FullName"
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="EmailAddress" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="EmailAddress"
              id="EmailAddress"
              placeholder="john@example.com"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="MobileNumber" className="block text-sm font-medium text-gray-300 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="MobileNumber"
              id="MobileNumber"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="Emails" className="block text-sm font-medium text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="Emails"
              id="Emails"
              placeholder="Project Inquiry"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tx" className="block text-sm font-medium text-gray-300 mb-1">
            Your Message
          </label>
          <textarea
            name="tx"
            id="tx"
            rows={5}
            required
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          ></textarea>
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {submitStatus ==='success' && (
            <p className="ml-4 text-green-400 text-sm">
              Message sent successfully! We'll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="ml-4 text-red-400 text-sm">
              Failed to send message. Please try again.
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
}