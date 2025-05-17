
import { supabase, isSupabaseConnected } from '@/lib/supabaseClient';

const mutationDisabledError = { data: null, error: new Error("La operación está deshabilitada porque Supabase no está conectado.") };

export const addColmadoToSupabase = async (newColmadoData) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data, error } = await supabase
    .from('colmados')
    .insert(newColmadoData)
    .select()
    .single();
  return { data, error };
};

export const updateColmadoInSupabase = async (colmadoToUpdate) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data, error } = await supabase
    .from('colmados')
    .update(colmadoToUpdate)
    .eq('id', colmadoToUpdate.id)
    .select()
    .single();
  return { data, error };
};

export const addCreditToSupabase = async (newCreditData) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data, error } = await supabase
    .from('credits')
    .insert(newCreditData)
    .select()
    .single();
  return { data, error };
};

export const updateCreditInSupabase = async (updatedCredit) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data, error } = await supabase
    .from('credits')
    .update(updatedCredit)
    .eq('id', updatedCredit.id)
    .select()
    .single();
  return { data, error };
};

export const addConsumptionToSupabase = async (newConsumptionData, currentCredits) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data: consumption, error: consumptionError } = await supabase
    .from('consumptions')
    .insert(newConsumptionData)
    .select()
    .single();
  if (consumptionError) return { data: null, error: consumptionError };

  const credit = currentCredits.find(c => c.id === newConsumptionData.credit_id);
  if (!credit) return {data: null, error: new Error("Credit not found for consumption")};

  const updatedRemainingAmount = Math.max(0, (credit.remaining_amount || 0) - newConsumptionData.amount);
  
  const { error: updateCreditError } = await supabase
    .from('credits')
    .update({ remaining_amount: updatedRemainingAmount })
    .eq('id', newConsumptionData.credit_id);

  if (updateCreditError) return { data: null, error: updateCreditError };
  
  return { data: { consumption, updatedRemainingAmount }, error: null };
};

export const addUserToSupabase = async (userData) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { email, password, role, name, colmado_id } = userData;
  
  const signUpOptions = {
    email,
    password,
    options: {
      data: { 
        full_name: name, 
        role: role,
      }
    }
  };

  if (role === 'colmado' && colmado_id) {
    signUpOptions.options.data.colmado_id = colmado_id;
  } else {
    signUpOptions.options.data.colmado_id = null; 
  }
  
  if (role === 'cliente') {
     signUpOptions.options.data.associated_credit_id = null; 
  }


  const { data: authData, error: authError } = await supabase.auth.signUp(signUpOptions);

  if (authError) return { data: null, error: authError };
  if (!authData.user) return { data: null, error: new Error("No se pudo crear el usuario en Supabase Auth.") };
  
  return { data: authData.user, error: null };
};

export const updateUserInSupabase = async (userId, updatedData) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { data, error } = await supabase
    .from('app_users')
    .update(updatedData)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

export const deleteUserFromSupabase = async (userId, authUserId) => {
  if (!isSupabaseConnected() || !supabase) return mutationDisabledError;
  const { error: dbError } = await supabase
    .from('app_users')
    .delete()
    .eq('id', userId);
  if (dbError) return { data: null, error: dbError };

  if (authUserId) {
     const { error: authError } = await supabase.auth.admin.deleteUser(authUserId);
     if (authError && authError.message !== "User not found") {
      console.warn("Could not delete auth user:", authError.message);
     }
  }
  return { data: { success: true }, error: null };
};
