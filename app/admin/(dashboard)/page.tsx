import { AdminHeading, Panel } from '@/components/admin/admin-ui';
import { requireAdmin } from '@/lib/admin';
import { formatDate } from '@/lib/utils';
export default async function AdminDashboard(){
  const {supabase}=await requireAdmin();
  const [courses,bookings,posts,enquiries,recentBookings,recentEnquiries]=await Promise.all([
    supabase.from('courses').select('*',{count:'exact',head:true}),
    supabase.from('bookings').select('*',{count:'exact',head:true}),
    supabase.from('blog_posts').select('*',{count:'exact',head:true}),
    supabase.from('enquiries').select('*',{count:'exact',head:true}),
    supabase.from('bookings').select('id,name,created_at,courses(title)').order('created_at',{ascending:false}).limit(4),
    supabase.from('enquiries').select('id,name,subject,created_at').order('created_at',{ascending:false}).limit(4)
  ]);
  const cards=[['Total Courses',courses.count||0],['Total Bookings',bookings.count||0],['Total Articles',posts.count||0],['Total Enquiries',enquiries.count||0]];
  const activity=[...(recentBookings.data??[]).map((item:any)=>({id:`booking-${item.id}`,label:`Booking: ${item.name}`,detail:item.courses?.title||'Course request',created_at:item.created_at})),...(recentEnquiries.data??[]).map((item:any)=>({id:`enquiry-${item.id}`,label:`Enquiry: ${item.name}`,detail:item.subject,created_at:item.created_at}))].sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime()).slice(0,6);
  return <div className="space-y-6"><AdminHeading title="Dashboard" text="Review your website content and recent training enquiries."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map(([label,count])=><Panel key={label as string}><p className="text-sm font-semibold text-gray-500">{label}</p><p className="mt-2 text-4xl font-bold text-brand">{count}</p></Panel>)}</div><Panel title="Recent activity">{activity.length?<div className="grid gap-3">{activity.map(item=><div key={item.id} className="flex flex-col justify-between gap-1 rounded-md border border-gray-100 p-3 sm:flex-row"><div><p className="text-sm font-bold text-gray-900">{item.label}</p><p className="text-sm text-gray-600">{item.detail}</p></div><p className="text-xs text-gray-500">{formatDate(item.created_at)}</p></div>)}</div>:<p className="text-sm leading-6 text-gray-600">New bookings and contact enquiries will appear here.</p>}</Panel></div>
}
