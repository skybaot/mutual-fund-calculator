import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-white mb-8 text-center"
      >
        About Us
      </motion.h1>

      <div className="space-y-8">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300">
            We're dedicated to making financial planning accessible to everyone. Our mutual fund calculator
            helps investors make informed decisions by providing accurate calculations and insights into
            their investment journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• Advanced calculation algorithms</li>
            <li>• Real-time market data integration</li>
            <li>• User-friendly interface</li>
            <li>• Educational resources</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Our Team</h2>
          <p className="text-gray-300">
            Our team consists of financial experts, software engineers, and UI/UX designers working
            together to provide you with the best tools for your investment planning needs.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
