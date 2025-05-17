
import React from "react";
import ColmadoCard from "./colmado-card";
import { Store, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ColmadoList = ({ colmados, onEditColmado, onAddNewColmado }) => {
  if (colmados.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Store className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay colmados registrados</h3>
        <p className="text-gray-500 mb-6">
          Comienza agregando los colmados afiliados a la red.
        </p>
        <Button onClick={onAddNewColmado}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Colmado
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colmados.map(colmado => (
        <ColmadoCard key={colmado.id} colmado={colmado} onEdit={onEditColmado} />
      ))}
    </div>
  );
};

export default ColmadoList;
