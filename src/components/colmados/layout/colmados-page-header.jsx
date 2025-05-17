
import React from "react";
import { motion } from "framer-motion";
import { Store, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColmadosPageHeader = ({ onAddNewColmado }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold flex items-center text-gray-800">
          <Store className="mr-3 h-8 w-8 text-primary" />
          Red de Colmados Afiliados
        </h1>
        <p className="text-gray-500 mt-1">
          Gestiona los colmados donde se puede usar la Tarjeta Colmado.
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button onClick={onAddNewColmado} className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Colmado
        </Button>
      </div>
    </motion.div>
  );
};

export default ColmadosPageHeader;
