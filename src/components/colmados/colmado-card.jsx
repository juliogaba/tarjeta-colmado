
import React from "react";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, Globe, Edit3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const ColmadoCard = ({ colmado, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-hover h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-white truncate" title={colmado.name}>{colmado.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2 flex-grow">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
            <span className="truncate" title={colmado.address}>{colmado.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span>{colmado.phone || "No disponible"}</span>
          </div>
          {colmado.website && (
            <div className="flex items-center text-sm text-blue-600 hover:underline">
              <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
              <a href={colmado.website.startsWith('http') ? colmado.website : `https://${colmado.website}`} target="_blank" rel="noopener noreferrer" className="truncate" title={colmado.website}>
                {colmado.website}
              </a>
            </div>
          )}
           {colmado.contactPerson && (
            <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                <span>Contacto: {colmado.contactPerson}</span>
            </div>
           )}
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 border-t">
            <Button variant="outline" size="sm" className="w-full flex items-center" onClick={() => onEdit(colmado)}>
                <Edit3 className="h-4 w-4 mr-2"/> Editar Detalles
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ColmadoCard;
