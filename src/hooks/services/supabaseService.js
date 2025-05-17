
import { supabase, isSupabaseConnected } from '@/lib/supabaseClient';

export const fetchAppUserFromSupabase = async (authUserId) => {
  if (!isSupabaseConnected() || !supabase) {
    console.warn("Supabase not connected, cannot fetch app user.");
    return 'SIGN_OUT_USER';
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const { data: userData, error: userError } = await supabase
        .from('app_users')
        .select(`
          *,
          colmado:colmado_id (
            id,
            name,
            status
          )
        `)
        .eq('auth_user_id', authUserId)
        .single();

      if (userError) {
        if (userError.code === 'PGRST116' && userError.details.includes("0 rows")) {
          if (attempt < 2) { 
            console.warn(`User with auth_user_id ${authUserId} not found in app_users. Attempt ${attempt + 1}/3. Retrying...`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            continue; 
          } else {
            console.warn(`User with auth_user_id ${authUserId} not found in app_users after 3 attempts (PGRST116). Forcing sign out. Error: ${userError.message}`);
            if (supabase) await supabase.auth.signOut().catch(err => console.error("Error signing out from fetchAppUser (PGRST116):", err));
            return 'SIGN_OUT_USER';
          }
        } else {
          console.error(`Error fetching app user (auth_user_id: ${authUserId}) during attempt ${attempt + 1}:`, userError);
          throw userError; 
        }
      }
      
      if (userData) {
        return {
          id: userData.id,
          auth_user_id: userData.auth_user_id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          colmadoId: userData.colmado_id,
          colmadoName: userData.colmado?.name,
          colmadoStatus: userData.colmado?.status,
          associated_credit_id: userData.associated_credit_id,
        };
      }
      
      if (attempt < 2) {
         console.warn(`No user data returned for auth_user_id ${authUserId} (no error). Attempt ${attempt + 1}/3. Retrying...`);
         await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
         continue;
      } else {
        console.warn(`No user data returned for auth_user_id ${authUserId} (no error) after 3 attempts. Forcing sign out.`);
        if (supabase) await supabase.auth.signOut().catch(err => console.error("Error signing out from fetchAppUser (no data):", err));
        return 'SIGN_OUT_USER';
      }

    } catch (error) {
      console.error(`Critical error in fetchAppUserFromSupabase for ${authUserId} on attempt ${attempt + 1}. Propagating error.`, error);
      throw error; 
    }
  }
  console.warn(`User ${authUserId} not found after exhausting retry loop. Forcing sign out.`);
  if (supabase) await supabase.auth.signOut().catch(err => console.error("Error signing out from fetchAppUser (exhausted retries):", err));
  return 'SIGN_OUT_USER'; 
};


export const fetchColmadosFromSupabase = async () => {
  if (!isSupabaseConnected() || !supabase) {
    console.warn("Supabase not connected, cannot fetch colmados.");
    return [];
  }
  const { data, error } = await supabase.from('colmados').select('*');
  if (error) {
    console.error("Error fetching colmados:", error);
    throw error;
  }
  return data;
};

export const fetchCreditsFromSupabase = async () => {
  if (!isSupabaseConnected() || !supabase) {
    console.warn("Supabase not connected, cannot fetch credits.");
    return [];
  }
  const { data, error } = await supabase.from('credits').select('*');
  if (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
  return data;
};

export const fetchConsumptionsFromSupabase = async () => {
  if (!isSupabaseConnected() || !supabase) {
    console.warn("Supabase not connected, cannot fetch consumptions.");
    return [];
  }
  const { data, error } = await supabase.from('consumptions').select('*');
  if (error) {
    console.error("Error fetching consumptions:", error);
    throw error;
  }
  return data;
};

export const fetchUsersFromSupabase = async () => {
  if (!isSupabaseConnected() || !supabase) {
    console.warn("Supabase not connected, cannot fetch users.");
    return [];
  }
  const { data, error } = await supabase.from('app_users').select('*');
  if (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
  return data;
};
