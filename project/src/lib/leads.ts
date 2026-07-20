import { supabase } from './supabase';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

export type NewLead = Pick<Lead, 'name' | 'phone' | 'email'>;

export async function saveLead(lead: NewLead): Promise<void> {
  const { error } = await supabase.from('leads').insert(lead);

  if (error) {
    throw new Error(`Unable to save lead: ${error.message}`);
  }
}
