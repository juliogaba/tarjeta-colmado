
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCard = ({ title, value, icon, description, trend, color = "blue" }) => {
  const colorVariants = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };

  const trendIcon = trend > 0 ? "↑" : trend < 0 ? "↓" : "";
  const trendColor = trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover"
    >
      <Card className="overflow-hidden border-t-4" style={{ borderTopColor: color === "blue" ? "#3b82f6" : color === "green" ? "#10b981" : color === "red" ? "#ef4444" : color === "purple" ? "#8b5cf6" : "#f59e0b" }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-700">{title}</CardTitle>
            <div className={`p-2 rounded-full ${colorVariants[color]}`}>
              {icon}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center mt-1">
            <span className={`text-sm ${trendColor} font-medium mr-1`}>
              {trendIcon} {Math.abs(trend)}%
            </span>
            <span className="text-sm text-gray-500">{description}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
