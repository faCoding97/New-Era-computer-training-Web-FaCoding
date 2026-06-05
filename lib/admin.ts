import { redirect } from 'next/navigation';
import { hasSupabaseEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

export async function requireAdmin() {
  if (!hasSupabaseEnv()) redirect('/admin/login?setup=required');
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!data) redirect('/admin/login?error=not-authorised');
  return { supabase, user };
}
