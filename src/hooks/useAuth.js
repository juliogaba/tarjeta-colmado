
import { useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase, isSupabaseConnected } from '@/lib/supabaseClient';
import { fetchAppUserFromSupabase } from '@/hooks/services/supabaseService';
import { addUserToSupabase as addUserToSupabaseService } from '@/hooks/services/supabaseMutationService';

export const useAuth = (setLoading, setCurrentUser, loadInitialData, fetchData, parentToastContext) => {
  const defaultToastAPI = useToast(); 
  const toast = parentToastContext ? parentToastContext.toast : defaultToastAPI.toast;

  const handleLogin = useCallback(async (email, password, role, colmadoId = null) => {
    if (!isSupabaseConnected()) {
      toast({ title: "Funcionalidad Deshabilitada", description: "El inicio de sesión no está disponible. Por favor, complete la integración de Supabase.", variant: "destructive" });
      return null;
    }
    setLoading(true);
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.toLowerCase().includes("networkerror") || signInError.message.toLowerCase().includes("failed to fetch")) {
            throw new Error("Error de red al intentar iniciar sesión. Por favor, verifica tu conexión a internet.");
        }
        if (signInError.message === "Email not confirmed") {
          throw new Error("Correo electrónico no confirmado. Por favor, revisa tu bandeja de entrada (y spam) para el correo de confirmación.");
        }
        if (signInError.message === "Invalid login credentials") {
            throw new Error("Credenciales de inicio de sesión inválidas. Verifica tu correo y contraseña.");
        }
        throw signInError;
      }
      
      if (signInData.user) {
        const appUser = await fetchAppUserFromSupabase(signInData.user.id);

        if (!appUser || appUser === 'SIGN_OUT_USER') {
          const errorMessage = "Usuario no encontrado en la base de datos de la aplicación o configuración incompleta. Por favor, contacte al administrador.";
          console.error(`Login Error: ${errorMessage} (appUser: ${appUser})`);
          if (appUser !== 'SIGN_OUT_USER' && supabase) {
            await supabase.auth.signOut(); 
          }
          throw new Error(errorMessage);
        }
        
        if (appUser.role !== role) {
          if (supabase) await supabase.auth.signOut(); 
          throw new Error("El rol seleccionado no coincide con el rol del usuario registrado.");
        }
        if (role === 'colmado') {
            if (!appUser.colmadoId) {
                if (supabase) await supabase.auth.signOut();
                throw new Error("Este usuario de colmado no tiene un colmado asignado. Contacte al administrador.");
            }
            if (appUser.colmadoId !== colmadoId) {
                if (supabase) await supabase.auth.signOut();
                throw new Error("El colmado seleccionado no coincide con el colmado asignado a este usuario.");
            }
            if (appUser.colmadoStatus !== 'Activo') {
                if (supabase) await supabase.auth.signOut();
                throw new Error("El colmado seleccionado no está activo. Contacte al administrador.");
            }
        }
        
        await fetchData(true); 
        toast({ title: "Inicio de Sesión Exitoso", description: `Bienvenido, ${appUser.name}!`, className: "bg-green-500 text-white"});
        return appUser; 
      }
      return null; 
    } catch (error) {
      console.error("Login error details:", error, error.stack);
      toast({ title: "Error de Autenticación", description: error.message, variant: "destructive" });
      setCurrentUser(null); 
      return null;
    } finally {
      setLoading(false); 
    }
  }, [toast, fetchData, setLoading, setCurrentUser]);

  const handleLogout = useCallback(async () => {
    if (!isSupabaseConnected()) {
      setCurrentUser(null);
      loadInitialData(false);
      toast({ title: "Sesión Cerrada (Local)", description: "Has cerrado sesión localmente."});
      return;
    }
    setLoading(true); 
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error);
      toast({ title: "Error al Cerrar Sesión", description: error.message, variant: "destructive" });
      setLoading(false); 
    } else {
      toast({ title: "Sesión Cerrada", description: "Has cerrado sesión exitosamente."});
    }
  }, [toast, loadInitialData, setLoading, setCurrentUser]);

  const addUserHandler = useCallback(async (userData) => {
    if (!isSupabaseConnected()) {
      toast({ title: "Funcionalidad Deshabilitada", description: "No se puede registrar el usuario. Supabase no conectado.", variant: "destructive" });
      return null;
    }
    setLoading(true);
    try {
      const result = await addUserToSupabaseService(userData);
      if (result.error) {
        console.error("Error adding user:", result.error);
        if (result.error.message.toLowerCase().includes("networkerror") || result.error.message.toLowerCase().includes("failed to fetch")) {
             toast({ title: "Error de Red", description: "No se pudo registrar el usuario. Verifica tu conexión a internet.", variant: "destructive" });
        } else {
            toast({ title: "Error al Crear Usuario", description: result.error.message, variant: "destructive" });
        }
        return null;
      } else {
        toast({ 
          title: "Usuario Registrado", 
          description: `El usuario ${userData.name} ha sido registrado. Por favor, verifica tu correo electrónico (incluyendo la carpeta de spam) para activar la cuenta.`,
          duration: 10000 
        });
        await fetchData(true); 
        return result.data; 
      }
    } catch (error) {
        console.error("Critical error in addUserHandler:", error);
        toast({ title: "Error Crítico al Crear Usuario", description: error.message, variant: "destructive" });
        return null;
    } finally {
        setLoading(false);
    }
  }, [toast, fetchData, setLoading]);

  return {
    handleLogin,
    handleLogout,
    addUser: addUserHandler,
  };
};
