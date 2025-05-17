
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, User, Store } from "lucide-react";

const LoginPage = ({ onLogin, allColmados = [], users: allUsers = [] }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); 
  const [selectedColmadoId, setSelectedColmadoId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginPageLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ae23ace6-68c5-43ad-a2f6-a0d926356e8e/48e68ad93a5413a5b0d8cdf5f5a164fb.png";

  useEffect(() => {
    if (role === "colmado" && allColmados.length > 0) {
      if (!allColmados.find(c => c.id === selectedColmadoId)) {
        setSelectedColmadoId(allColmados[0].id); 
      }
    } else if (role !== "colmado") {
      setSelectedColmadoId("");
    }
  }, [allColmados, role, selectedColmadoId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Por favor ingrese correo y contraseña.", variant: "destructive" });
      return;
    }

    if (role === "colmado" && !selectedColmadoId) {
      toast({ title: "Error", description: "Por favor seleccione un colmado.", variant: "destructive" });
      return;
    }

    let foundUser = null;
    const effectiveUsers = allUsers && allUsers.length > 0 ? allUsers : [
      { id: "admin001_fallback", name: "Administrador por Defecto", email: "admin@example.com", password: "password", role: "admin" }
    ];


    foundUser = effectiveUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password &&
      u.role === role &&
      (role !== 'colmado' || u.colmadoId === selectedColmadoId)
    );

    if (foundUser) {
      const colmadoDetails = foundUser.role === 'colmado' ? allColmados.find(c => c.id === foundUser.colmadoId) : null;
      const userToLogin = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        ...(foundUser.role === 'colmado' && { 
          colmadoId: foundUser.colmadoId, 
          colmadoName: colmadoDetails?.name || 'N/A' 
        })
      };
      onLogin(userToLogin);
      toast({ title: "Inicio de Sesión Exitoso", description: `Bienvenido, ${userToLogin.name}!`, className: "bg-green-500 text-white"});
      
      if (userToLogin.role === "admin") {
        navigate("/");
      } else if (userToLogin.role === "colmado") {
        if (userToLogin.colmadoId) {
          navigate(`/colmado-dashboard/${userToLogin.colmadoId}`);
        } else {
           navigate("/login"); // Or an error page
           toast({ title: "Error de Configuración", description: "Usuario de colmado sin ID de colmado asignado.", variant: "destructive" });
        }
      } else {
         navigate("/"); 
      }
    } else {
      toast({ title: "Error de Autenticación", description: "Credenciales incorrectas o rol/colmado no válido.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-2"
            >
              <img src={loginPageLogoUrl} alt="Tarjeta Colmado y Producciones Gaba Logo" className="h-24 w-auto" />
            </motion.div>
            <p className="text-xs text-gray-500 mb-3 -mt-2">Una dependencia de Producciones Gaba</p>
            <CardTitle className="text-3xl font-bold">Tarjeta Colmado</CardTitle>
            <CardDescription>Inicia sesión para acceder a tu panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center"><User className="h-4 w-4 mr-2 text-gray-500"/>Tipo de Usuario</Label>
                <Select value={role} onValueChange={(value) => {
                  setRole(value);
                  if (value === 'colmado' && allColmados.length > 0) {
                    setSelectedColmadoId(allColmados[0].id); 
                  } else {
                    setSelectedColmadoId("");
                  }
                }}>
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

              {role === "colmado" && (
                <div className="space-y-2">
                  <Label htmlFor="colmado" className="flex items-center"><Store className="h-4 w-4 mr-2 text-gray-500"/>Seleccionar Colmado</Label>
                  <Select value={selectedColmadoId} onValueChange={setSelectedColmadoId} disabled={allColmados.length === 0}>
                    <SelectTrigger id="colmado">
                      <SelectValue placeholder={allColmados.length > 0 ? "Elige tu colmado" : "No hay colmados disponibles"} />
                    </SelectTrigger>
                    <SelectContent>
                      {allColmados.length > 0 ? (
                        allColmados.map(colmado => (
                          <SelectItem key={colmado.id} value={colmado.id}>{colmado.name}</SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-3 text-sm text-center text-gray-500">No hay colmados registrados.</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={role === 'admin' ? "admin@example.com" : (role === 'colmado' ? "usuario@colmado.com" : "cliente@example.com")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg">
                  <LogIn className="mr-2 h-5 w-5" />
                  Ingresar
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
