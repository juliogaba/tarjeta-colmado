
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CreditScoreChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Evolución del Puntaje Crediticio</CardTitle>
          <p className="text-sm text-gray-500">No hay datos de puntaje disponibles.</p>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center h-64">
          <p className="text-gray-400">Datos no disponibles</p>
        </CardContent>
      </Card>
    );
  }

  const lastScore = data[data.length - 1]?.score || 0;
  let scoreColor = "#ef4444"; 

  if (lastScore >= 700) {
    scoreColor = "#10b981"; 
  } else if (lastScore >= 600) {
    scoreColor = "#f59e0b"; 
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-hover"
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Evolución del Puntaje Crediticio</CardTitle>
          <p className="text-sm text-gray-500">Seguimiento de tu puntaje crediticio a lo largo del tiempo</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis 
                  domain={[500, 850]}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, "Puntaje"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke={scoreColor} 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "white", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: scoreColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreditScoreChart;
