
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const ConsumptionsByColmadoChart = ({ consumptions, credits }) => {
  const consumptionsByColmado = consumptions.reduce((acc, curr) => {
    const colmadoName = curr.colmadoName || credits.find(c => c.id === curr.creditId)?.colmadoName || "Desconocido";
    acc[colmadoName] = (acc[colmadoName] || 0) + curr.amount;
    return acc;
  }, {});

  const colmadoConsumptionData = Object.entries(consumptionsByColmado)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  if (colmadoConsumptionData.length === 0) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Consumos por Colmado (Top 5)</CardTitle>
          <CardDescription>No hay datos de consumo disponibles.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-gray-400">Datos no disponibles</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Consumos por Colmado (Top 5)</CardTitle>
          <CardDescription>Volumen de consumo en los colmados más activos.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={colmadoConsumptionData} layout="vertical" margin={{ left: 30, right:20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
              <YAxis dataKey="name" type="category" width={100} interval={0} tick={{fontSize: 12}}/>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Consumo Total"]} />
              <Legend />
              <Bar dataKey="value" name="Consumo Total" fill="url(#consumoGradient)" barSize={20} radius={[0, 10, 10, 0]} />
              <defs>
                <linearGradient id="consumoGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8884d8" />
                  <stop offset="100%" stopColor="#82ca9d" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConsumptionsByColmadoChart;
