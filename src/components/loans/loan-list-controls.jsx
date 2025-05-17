
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const LoanListControls = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por cliente o colmado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-500"/>
        <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-md bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="Todos">Todos los Estados</option>
            <option value="Activo">Activo</option>
            <option value="Pendiente Aprobación">Pendiente Aprobación</option>
            <option value="Pagado">Pagado</option>
            <option value="Rechazado">Rechazado</option>
        </select>
      </div>
    </div>
  );
};

export default LoanListControls;
