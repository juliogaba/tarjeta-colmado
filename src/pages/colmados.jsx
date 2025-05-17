
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Store, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import ColmadoList from "@/components/colmados/colmado-list";
import ColmadoForm from "@/components/colmados/colmado-form";
import ColmadosPageHeader from "@/components/colmados/layout/colmados-page-header";
import ColmadosSearchBar from "@/components/colmados/layout/colmados-search-bar";

const ColmadosPage = ({ allColmados = [], updateColmados }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedColmado, setSelectedColmado] = useState(null);
  const { toast } = useToast();

  const handleAddOrUpdateColmado = (colmadoData) => {
    let updatedColmados;
    if (selectedColmado && selectedColmado.id) { // Editing existing
      updatedColmados = allColmados.map(c => 
        c.id === selectedColmado.id ? { ...c, ...colmadoData } : c
      );
    } else { // Adding new
      const newColmado = { ...colmadoData, id: Date.now().toString() };
      updatedColmados = [...allColmados, newColmado];
    }
    updateColmados(updatedColmados);
    setIsFormOpen(false);
    setSelectedColmado(null);
    toast({
      title: `Colmado ${selectedColmado ? 'actualizado' : 'agregado'}`,
      description: `El colmado "${colmadoData.name}" ha sido ${selectedColmado ? 'actualizado' : 'agregado'} exitosamente.`,
      className: "bg-green-500 text-white"
    });
  };
  
  const openFormForNew = () => {
    setSelectedColmado(null);
    setIsFormOpen(true);
  };

  const openFormForEdit = (colmado) => {
    setSelectedColmado(colmado);
    setIsFormOpen(true);
  };
  
  const filteredColmados = allColmados.filter(colmado =>
    (colmado.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (colmado.address?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (colmado.contactPerson?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <ColmadosPageHeader onAddNewColmado={openFormForNew} />
      <ColmadosSearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

      <ColmadoList
        colmados={filteredColmados}
        onEditColmado={openFormForEdit}
        onAddNewColmado={openFormForNew}
      />

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
        setIsFormOpen(isOpen);
        if (!isOpen) setSelectedColmado(null);
      }}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-xl">
          <DialogHeader className="p-6 border-b border-gray-200">
            <DialogTitle className="text-xl font-semibold text-gray-800">{selectedColmado ? "Editar Colmado" : "Agregar Nuevo Colmado"}</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {selectedColmado ? "Modifica los detalles del colmado." : "Ingresa la información del nuevo colmado afiliado."}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <ColmadoForm
              onSubmit={handleAddOrUpdateColmado}
              onCancel={() => { setIsFormOpen(false); setSelectedColmado(null); }}
              colmado={selectedColmado}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColmadosPage;
