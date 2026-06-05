import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/supabase/env';
import { bookingSchema } from '@/lib/validation';
export async function POST(request:Request){try{const parsed=bookingSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid booking details'},{status:400});if(!hasSupabaseEnv())return NextResponse.json({ok:true,demo:true},{status:201});const supabase=createClient();const {error}=await supabase.from('bookings').insert({...parsed.data,preferred_date:parsed.data.preferred_date||null});if(error)throw error;return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:'Unable to submit booking'},{status:500})}}
