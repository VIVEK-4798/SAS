'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'How long will it take to get my orders?',
      answer: 'Orders are typically processed within 1–2 business days and shipping times vary between 3–7 days depending on your location.',
    },
    {
      question: 'What is the return policy?',
      answer: 'Returns are accepted within 14 days of delivery for unworn, unwashed items in their original packaging. Please check our Return Policy page.',
    },
    {
      question: 'How much is shipping?',
      answer: 'We offer free standard shipping on orders over ₹100. Shipping charges for other orders will be calculated at checkout.',
    },
    {
      question: 'Other concerns & questions?',
      answer: 'Feel free to reach out via our contact form or email support@yourbrand.com — we usually respond within 24 hours.',
    },
  ];

  return (
    <section id='faq' className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-3 text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-500"
          >
            Find answers to common questions about our products and services
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#fdf3e7] rounded-xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full text-left flex justify-between items-center p-6 focus:outline-none hover:bg-[#ffe7c9] transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{item.question}</span>
                <motion.span 
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  className="text-gray-500 text-2xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;