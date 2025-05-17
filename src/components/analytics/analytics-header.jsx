
import React from "react";
import { motion } from "framer-motion";

const AnalyticsHeader = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
        {title}
      </h1>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AnalyticsHeader;
