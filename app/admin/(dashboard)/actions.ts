'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin';
import { slugify } from '@/lib/utils';

function value(form: FormData, key: string) {
  return String(form.get(key) || '').trim();
}

function lines(form: FormData, key: string) {
  return value(form, key).split('\n').map((item) => item.trim()).filter(Boolean);
}

function jsonArray(form: FormData, key: string) {
  const raw = value(form, key);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function createCategory(form: FormData) {
  const { supabase } = await requireAdmin();
  const name = value(form, 'name');
  if (name) await supabase.from('course_categories').insert({ name, slug: value(form, 'slug') || slugify(name), description: value(form, 'description') });
  revalidatePath('/admin/categories'); revalidatePath('/courses');
}

export async function updateCategory(form: FormData) {
  const { supabase } = await requireAdmin();
  const name = value(form, 'name');
  await supabase.from('course_categories').update({ name, slug: value(form, 'slug') || slugify(name), description: value(form, 'description') }).eq('id', value(form, 'id'));
  revalidatePath('/admin/categories'); revalidatePath('/courses');
}

export async function deleteCategory(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('course_categories').delete().eq('id', value(form, 'id'));
  revalidatePath('/admin/categories');
}

export async function createCourse(form: FormData) {
  const { supabase } = await requireAdmin();
  const title = value(form, 'title');
  if (title) await supabase.from('courses').insert({ title, slug: value(form, 'slug') || slugify(title), excerpt: value(form, 'excerpt'), description: value(form, 'description'), duration: value(form, 'duration'), category_id: value(form, 'category_id') || null, requirements: [], learning_outcomes: [], who_should_attend: [], benefits: [], faqs: [], is_featured: form.get('is_featured') === 'on' });
  revalidatePath('/admin/courses'); revalidatePath('/courses'); revalidatePath('/');
}

export async function updateCourse(form: FormData) {
  const { supabase } = await requireAdmin();
  const title = value(form, 'title');
  const slug = value(form, 'slug') || slugify(title);
  await supabase.from('courses').update({ title, slug, excerpt: value(form, 'excerpt'), description: value(form, 'description'), duration: value(form, 'duration'), category_id: value(form, 'category_id') || null, featured_image: value(form, 'featured_image') || null, og_image: value(form, 'og_image') || null, seo_title: value(form, 'seo_title') || null, seo_description: value(form, 'seo_description') || null, requirements: lines(form, 'requirements'), learning_outcomes: lines(form, 'learning_outcomes'), who_should_attend: lines(form, 'who_should_attend'), benefits: lines(form, 'benefits'), faqs: jsonArray(form, 'faqs'), is_featured: form.get('is_featured') === 'on', updated_at: new Date().toISOString() }).eq('id', value(form, 'id'));
  revalidatePath('/admin/courses'); revalidatePath(`/courses/${slug}`); revalidatePath('/courses'); revalidatePath('/');
  redirect('/admin/courses?saved=1');
}

export async function deleteCourse(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('courses').delete().eq('id', value(form, 'id'));
  revalidatePath('/admin/courses'); revalidatePath('/courses'); revalidatePath('/');
}

export async function toggleFeaturedCourse(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('courses').update({ is_featured: value(form, 'featured') !== 'true' }).eq('id', value(form, 'id'));
  revalidatePath('/admin/courses'); revalidatePath('/');
}

export async function createPost(form: FormData) {
  const { supabase } = await requireAdmin();
  const title = value(form, 'title');
  if (title) await supabase.from('blog_posts').insert({ title, slug: value(form, 'slug') || slugify(title), excerpt: value(form, 'excerpt'), content: value(form, 'content'), status: value(form, 'status') || 'draft', tags: [] });
  revalidatePath('/admin/blog'); revalidatePath('/blog'); revalidatePath('/');
}

export async function updatePost(form: FormData) {
  const { supabase } = await requireAdmin();
  const title = value(form, 'title');
  const slug = value(form, 'slug') || slugify(title);
  await supabase.from('blog_posts').update({ title, slug, excerpt: value(form, 'excerpt'), content: value(form, 'content'), status: value(form, 'status') || 'draft', featured_image: value(form, 'featured_image') || null, og_image: value(form, 'og_image') || null, seo_title: value(form, 'seo_title') || null, seo_description: value(form, 'seo_description') || null, tags: lines(form, 'tags'), updated_at: new Date().toISOString() }).eq('id', value(form, 'id'));
  revalidatePath('/admin/blog'); revalidatePath(`/blog/${slug}`); revalidatePath('/blog'); revalidatePath('/');
  redirect('/admin/blog?saved=1');
}

export async function deletePost(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('blog_posts').delete().eq('id', value(form, 'id'));
  revalidatePath('/admin/blog'); revalidatePath('/blog'); revalidatePath('/');
}

export async function createTestimonial(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('testimonials').insert({ name: value(form, 'name'), company: value(form, 'company'), review: value(form, 'review'), featured: form.get('featured') === 'on' });
  revalidatePath('/admin/testimonials'); revalidatePath('/');
}

export async function updateTestimonial(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('testimonials').update({ name: value(form, 'name'), company: value(form, 'company'), review: value(form, 'review'), featured: form.get('featured') === 'on' }).eq('id', value(form, 'id'));
  revalidatePath('/admin/testimonials'); revalidatePath('/');
}

export async function deleteTestimonial(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('testimonials').delete().eq('id', value(form, 'id'));
  revalidatePath('/admin/testimonials'); revalidatePath('/');
}

export async function setBookingStatus(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('bookings').update({ status: value(form, 'status') }).eq('id', value(form, 'id'));
  revalidatePath('/admin/bookings');
}

export async function setEnquiryStatus(form: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from('enquiries').update({ status: value(form, 'status') }).eq('id', value(form, 'id'));
  revalidatePath('/admin/enquiries');
}

export async function deleteMedia(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, 'id');
  const { data } = await supabase.from('media').select('url').eq('id', id).maybeSingle();
  if (data?.url) {
    const marker = '/storage/v1/object/public/media/';
    const index = data.url.indexOf(marker);
    if (index >= 0) await supabase.storage.from('media').remove([decodeURIComponent(data.url.slice(index + marker.length))]);
  }
  await supabase.from('media').delete().eq('id', id);
  revalidatePath('/admin/media');
}

export async function updateSettings(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = value(form, 'id');
  const values = { site_name: value(form, 'site_name'), phone: value(form, 'phone'), email: value(form, 'email'), address: value(form, 'address'), logo: value(form, 'logo'), favicon: value(form, 'favicon'), footer_text: value(form, 'footer_text'), facebook: value(form, 'facebook'), linkedin: value(form, 'linkedin'), instagram: value(form, 'instagram'), seo_title: value(form, 'seo_title'), seo_description: value(form, 'seo_description') };
  if (id) await supabase.from('site_settings').update(values).eq('id', id); else await supabase.from('site_settings').insert(values);
  revalidatePath('/', 'layout'); redirect('/admin/settings?saved=1');
}
