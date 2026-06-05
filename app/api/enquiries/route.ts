import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasSupabaseEnv } from '@/lib/supabase/env';
import { enquirySchema } from '@/lib/validation';
export async function POST(request:Request){try{const parsed=enquirySchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:'Invalid enquiry details'},{status:400});if(!hasSupabaseEnv())return NextResponse.json({ok:true,demo:true},{status:201});const supabase=createClient();const {error}=await supabase.from('enquiries').insert(parsed.data);if(error)throw error;return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:'Unable to submit enquiry'},{status:500})}}
