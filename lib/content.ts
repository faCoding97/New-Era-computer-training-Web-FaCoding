import seed from '@/data/site.json';
import type { BlogPost, Course, CourseCategory, SiteData, SiteSettings, Testimonial } from '@/lib/types';
import { hasSupabaseEnv } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

const fallback = seed as SiteData;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSupabaseEnv()) return fallback.settings;
  const supabase = createClient();
  const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
  return (data as SiteSettings | null) ?? fallback.settings;
}

export async function getCategories(): Promise<CourseCategory[]> {
  if (!hasSupabaseEnv()) return fallback.categories;
  const supabase = createClient();
  const { data } = await supabase.from('course_categories').select('*').order('name');
  return (data as CourseCategory[] | null)?.length ? data as CourseCategory[] : fallback.categories;
}

export async function getCourses(options?: { featured?: boolean }): Promise<Course[]> {
  if (!hasSupabaseEnv()) return options?.featured ? fallback.courses.filter((item) => item.is_featured) : fallback.courses;
  const supabase = createClient();
  let query = supabase.from('courses').select('*, course_categories(*)').order('title');
  if (options?.featured) query = query.eq('is_featured', true);
  const { data } = await query;
  return (data as Course[] | null)?.length ? data as Course[] : (options?.featured ? fallback.courses.filter((item) => item.is_featured) : fallback.courses);
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (!hasSupabaseEnv()) return fallback.courses.find((item) => item.slug === slug) ?? null;
  const supabase = createClient();
  const { data } = await supabase.from('courses').select('*, course_categories(*)').eq('slug', slug).maybeSingle();
  return (data as Course | null) ?? fallback.courses.find((item) => item.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!hasSupabaseEnv()) return fallback.testimonials;
  const supabase = createClient();
  const { data } = await supabase.from('testimonials').select('*').eq('featured', true).order('created_at', { ascending: false });
  return (data as Testimonial[] | null)?.length ? data as Testimonial[] : fallback.testimonials;
}

export async function getPosts(options?: { limit?: number }): Promise<BlogPost[]> {
  if (!hasSupabaseEnv()) return options?.limit ? fallback.posts.slice(0, options.limit) : fallback.posts;
  const supabase = createClient();
  let query = supabase.from('blog_posts').select('*, blog_categories(*)').eq('status', 'published').order('created_at', { ascending: false });
  if (options?.limit) query = query.limit(options.limit);
  const { data } = await query;
  return (data as BlogPost[] | null)?.length ? data as BlogPost[] : (options?.limit ? fallback.posts.slice(0, options.limit) : fallback.posts);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasSupabaseEnv()) return fallback.posts.find((item) => item.slug === slug) ?? null;
  const supabase = createClient();
  const { data } = await supabase.from('blog_posts').select('*, blog_categories(*)').eq('slug', slug).eq('status', 'published').maybeSingle();
  return (data as BlogPost | null) ?? fallback.posts.find((item) => item.slug === slug) ?? null;
}
