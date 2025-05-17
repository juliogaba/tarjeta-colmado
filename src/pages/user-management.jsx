
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash2, UserPlus, Users, ShieldCheck, Building, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserForm = ({ user, onSubmit, onCancel, allColmados = [] }) => {
  const [formData, setFormData] = useState(
    user || { name: '', email: '', password: '', role: 'cliente', colmadoId: '' }
  );
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value, colmadoId: value !== 'colmado' ? '' : prev.colmadoId }));
  };

  const handleColmadoChange = (value) => {
    setFormData(prev => ({ ...prev, colmadoId: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!user && !formData.password) || !formData.role) {
      toast({ title: "Error", description: "Por favor complete todos los campos requeridos.", variant: "destructive" });
      return;
    }
    if (formData.role === 'colmado' && !formData.colmadoId) {
      toast({ title: "Error", description: "Por favor seleccione un colmado para el usuario de tipo colmado.", variant: "destructive" });
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre Completo</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" />
      </div>
      <div>
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Ej: juan.perez@example.com" />
      </div>
      <div>
        <Label htmlFor="password">{user ? "Nueva Contraseña (opcional)" : "Contraseña"}</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Dejar en blanco para no cambiar" />
      </div>
      <div>
        <Label htmlFor="role">Rol</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Seleccionar rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="colmado">Colmado</SelectItem>
            <SelectItem value="cliente">Cliente</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {formData.role === 'colmado' && (
        <div>
          <Label htmlFor="colmadoId">Colmado Asignado</Label>
          <Select value={formData.colmadoId} onValueChange={handleColmadoChange} disabled={allColmados.length === 0}>
            <SelectTrigger id="colmadoId">
              <SelectValue placeholder={allColmados.length > 0 ? "Seleccionar colmado" : "No hay colmados disponibles"} />
            </SelectTrigger>
            <SelectContent>
              {allColmados.map(colmado => (
                <SelectItem key={colmado.id} value={colmado.id}>{colmado.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">{user ? "Actualizar Usuario" : "Crear Usuario"}</Button>
      </DialogFooter>
    </form>
  );
};

const UserCard = ({ user, onEdit, onDelete, colmadoName }) => {
  const getRoleIcon = (role) => {
    if (role === 'admin') return <ShieldCheck className="h-5 w-5 text-red-500" />;
    if (role === 'colmado') return <Building className="h-5 w-5 text-blue-500" />;
    return <UserIcon className="h-5 w-5 text-green-500" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getRoleIcon(user.role)}
          <h3 className="text-lg font-semibold text-primary dark:text-sky-400">{user.name}</h3>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-slate-400">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-slate-500 capitalize">Rol: {user.role}</p>
      {user.role === 'colmado' && colmadoName && (
        <p className="text-sm text-gray-500 dark:text-slate-500">Colmado: {colmadoName}</p>
      )}
    </motion.div>
  );
};

const UserManagementPage = ({ users: initialUsers = [], addUser, updateUser, deleteUser, allColmados = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleAddUser = (userData) => {
    const newUser = { ...userData, id: `user-${Date.now()}` };
    addUser(newUser);
    setUsers(prev => [...prev, newUser]);
    toast({ title: "Usuario Creado", description: `${newUser.name} ha sido añadido.` });
    setIsFormOpen(false);
  };

  const handleUpdateUser = (userData) => {
    updateUser(userData.id, userData);
    setUsers(prev => prev.map(u => u.id === userData.id ? userData : u));
    toast({ title: "Usuario Actualizado", description: `${userData.name} ha sido actualizado.` });
    setEditingUser(null);
    setIsFormOpen(false);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    deleteUser(userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast({ title: "Usuario Eliminado", description: `${userToDelete?.name || 'El usuario'} ha sido eliminado.`, variant: "destructive" });
  };

  const openFormForEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const openFormForAdd = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };
  
  const closeForm = () => {
    setEditingUser(null);
    setIsFormOpen(false);
  }

  const getColmadoNameById = (colmadoId) => {
    const colmado = allColmados.find(c => c.id === colmadoId);
    return colmado ? colmado.name : 'N/A';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              <Users className="mr-3 h-8 w-8 text-primary dark:text-sky-400" />
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600 dark:text-slate-400">Administra los usuarios y sus roles en el sistema.</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openFormForAdd} className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white">
                <UserPlus className="mr-2 h-5 w-5" />
                Añadir Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
              </DialogHeader>
              <UserForm
                user={editingUser}
                onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                onCancel={closeForm}
                allColmados={allColmados}
              />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {users.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <Users className="mx-auto h-16 w-16 text-gray-400 dark:text-slate-500 mb-4" />
          <p className="text-xl text-gray-600 dark:text-slate-400">No hay usuarios registrados.</p>
          <p className="text-sm text-gray-500 dark:text-slate-500">Comienza añadiendo un nuevo usuario.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {users.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onEdit={openFormForEdit} 
                onDelete={handleDeleteUser}
                colmadoName={user.role === 'colmado' ? getColmadoNameById(user.colmadoId) : null}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
