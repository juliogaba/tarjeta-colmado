
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ColmadosSearchBar = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Buscar colmado por nombre, dirección o contacto..."
          className="pl-12 pr-4 py-2.5 text-base border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary transition-all duration-150 ease-in-out hover:border-gray-400"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColmadosSearchBar;
