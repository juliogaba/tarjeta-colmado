
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ColmadoForm = ({ onSubmit, onCancel, colmado }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
    contactPerson: "",
  });

  useEffect(() => {
    if (colmado) {
      setFormData({
        name: colmado.name || "",
        address: colmado.address || "",
        phone: colmado.phone || "",
        website: colmado.website || "",
        contactPerson: colmado.contactPerson || "",
      });
    } else {
      setFormData({ name: "", address: "", phone: "", website: "", contactPerson: "" });
    }
  }, [colmado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      toast({
        title: "Error de Validación",
        description: "El nombre y la dirección del colmado son campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ ...formData, id: colmado?.id });
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div>
        <Label htmlFor="name">Nombre del Colmado</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Colmado El Sol Naciente" required />
      </div>
      <div>
        <Label htmlFor="address">Dirección Completa</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Ej: Calle Luna #123, Sector Estrella" required />
      </div>
      <div>
        <Label htmlFor="phone">Número de Teléfono</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Ej: (809) 123-4567" />
      </div>
       <div>
        <Label htmlFor="website">Sitio Web (Opcional)</Label>
        <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="Ej: www.colmadoelsol.com" />
      </div>
      <div>
        <Label htmlFor="contactPerson">Persona de Contacto (Opcional)</Label>
        <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Ej: Ana Pérez" />
      </div>
      <div className="flex justify-end space-x-2 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">{colmado ? "Actualizar Colmado" : "Agregar Colmado"}</Button>
      </div>
    </form>
  );
};

export default ColmadoForm;
