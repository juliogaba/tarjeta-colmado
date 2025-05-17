
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AdminRecentActivityLists = ({ credits, consumptions }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const renderListItem = (item, type, index) => (
    <motion.li
      key={item.id}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-md transition-colors"
    >
      <div>
        <p className="font-medium text-sm text-gray-800">
          {type === 'credit' ? item.clientName : item.clientName || item.creditName}
          {type === 'credit' && <span className="text-xs text-gray-500 ml-1">({item.colmadoName})</span>}
        </p>
        <p className="text-xs text-gray-500">
          {type === 'credit' ? `Monto: $${item.amount.toLocaleString()}` : `Monto: $${item.amount.toLocaleString()}`}
          {type === 'credit' ? ` | Estado: ${item.status}` : ` | ${format(new Date(item.paymentDate || item.createdAt), "P", { locale: es })}`}
        </p>
      </div>
      <Link to={type === 'credit' ? `/creditos#${item.id}` : `/consumos#${item.id}`}>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
          Ver <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </Link>
    </motion.li>
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-indigo-600" />
              <CardTitle>Créditos Recientes</CardTitle>
            </div>
            <Link to="/creditos">
              <Button variant="link" className="text-sm text-indigo-600 hover:text-indigo-800">Ver todos</Button>
            </Link>
          </div>
          <CardDescription>Últimos créditos otorgados o actualizados.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {credits.length > 0 ? (
            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {credits.map((credit, index) => renderListItem(credit, 'credit', index))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-6">No hay créditos recientes.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
               <ShoppingBag className="h-6 w-6 mr-2 text-teal-600" />
              <CardTitle>Consumos Recientes</CardTitle>
            </div>
            <Link to="/consumos">
              <Button variant="link" className="text-sm text-teal-600 hover:text-teal-800">Ver todos</Button>
            </Link>
          </div>
          <CardDescription>Últimos consumos registrados en la red.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {consumptions.length > 0 ? (
            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {consumptions.map((consumption, index) => renderListItem(consumption, 'consumption', index))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-6">No hay consumos recientes.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRecentActivityLists;
