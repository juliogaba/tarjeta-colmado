
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const DashboardHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido a tu sistema Tarjeta Colmado</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/creditos/nuevo">
            <Button className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Crédito
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
