// lib/userstore.ts
import { supabase } from './supabaseClient'; // your initialized client
import bcrypt from 'bcrypt';

export async function findUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return null;
  return data;
}

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashedPassword }])
    .select()
    .single();

  if (error) return null;
  return data;
}
