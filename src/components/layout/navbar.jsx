
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, CreditCard, BarChart3, User, LogOut, Settings, Store, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const tarjetaColmadoLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/ae23ace6-68c5-43ad-a2f6-a0d926356e8e/d0337c266161dc3ca22a48e67120b7c5.png";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };
  
  const isAdmin = currentUser?.role === "admin";
  const isColmado = currentUser?.role === "colmado";
  const colmadoName = currentUser?.colmadoName || "Colmado";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={tarjetaColmadoLogoUrl} alt="Tarjeta Colmado Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAdmin && (
              <>
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Inicio
                </Link>
                <Link to="/creditos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Créditos
                </Link>
                <Link to="/consumos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Consumos
                </Link>
                <Link to="/analisis" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Análisis
                </Link>
                <Link to="/colmados" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Colmados
                </Link>
                <Link to="/usuarios" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                  Usuarios
                </Link>
              </>
            )}
            {isColmado && (
              <Link to={`/colmado-dashboard/${currentUser.colmadoId}`} className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                <LayoutDashboard className="inline-block mr-1 h-4 w-4" /> Mi Panel
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {currentUser?.name ? currentUser.name.substring(0,2).toUpperCase() : "US"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{currentUser?.name || (isColmado ? colmadoName : "Mi Cuenta")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogoutClick}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            {isAdmin && (
              <>
                <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Inicio</Link>
                <Link to="/creditos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Créditos</Link>
                <Link to="/consumos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Consumos</Link>
                <Link to="/analisis" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Análisis</Link>
                <Link to="/colmados" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Colmados</Link>
                <Link to="/usuarios" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Usuarios</Link>
              </>
            )}
             {isColmado && (
              <Link to={`/colmado-dashboard/${currentUser.colmadoId}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                <LayoutDashboard className="inline-block mr-1 h-4 w-4" /> Mi Panel
              </Link>
            )}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                     {currentUser?.name ? currentUser.name.substring(0,2).toUpperCase() : "US"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{currentUser?.name || (isColmado ? colmadoName : "Usuario")}</div>
                  <div className="text-sm font-medium text-gray-500">{currentUser?.email || "usuario@ejemplo.com"}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/perfil" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Perfil</Link>
                <Link to="/configuracion" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => setIsOpen(false)}>Configuración</Link>
                <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100" onClick={() => { setIsOpen(false); handleLogoutClick();}}>Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
