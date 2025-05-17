
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Fingerprint } from "lucide-react";

const EnterClientIdModal = ({ isOpen, onOpenChange, onSubmit }) => {
  const [clientIdInput, setClientIdInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clientIdInput.trim()) {
      onSubmit(clientIdInput.trim());
      setClientIdInput(""); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setClientIdInput(""); 
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Fingerprint className="mr-2 h-5 w-5 text-blue-600" />
            Identificar Cliente
          </DialogTitle>
          <DialogDescription>
            Ingrese el Número de Cédula o ID de Cliente para registrar un consumo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 py-4">
            <div className="grid flex-1 gap-2">
              <Input
                id="clientIdInput"
                placeholder="Ej: 001-1234567-8 ó CL123"
                value={clientIdInput}
                onChange={(e) => setClientIdInput(e.target.value)}
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              onOpenChange(false);
              setClientIdInput("");
            }}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="mr-2 h-4 w-4" /> Buscar Cliente
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnterClientIdModal;
