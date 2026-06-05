-- New Era Computer Training Centre: production schema, policies and future LMS preparation.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

create table if not exists public.course_categories (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, description text, created_at timestamptz not null default now());
create table if not exists public.courses (id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, excerpt text not null default '', description text not null default '', duration text not null default '', requirements jsonb not null default '[]'::jsonb, learning_outcomes jsonb not null default '[]'::jsonb, who_should_attend jsonb not null default '[]'::jsonb, benefits jsonb not null default '[]'::jsonb, faqs jsonb not null default '[]'::jsonb, category_id uuid references public.course_categories(id) on delete set null, featured_image text, og_image text, is_featured boolean not null default false, seo_title text, seo_description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.bookings (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text not null, course_id uuid not null references public.courses(id) on delete restrict, preferred_date date, message text not null default '', status text not null default 'new' check(status in ('new','contacted','confirmed','closed')), created_at timestamptz not null default now());
create table if not exists public.blog_categories (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, created_at timestamptz not null default now());
create table if not exists public.blog_posts (id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, excerpt text not null default '', content text not null default '', featured_image text, og_image text, seo_title text, seo_description text, status text not null default 'draft' check(status in ('draft','published')), tags jsonb not null default '[]'::jsonb, category_id uuid references public.blog_categories(id) on delete set null, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.testimonials (id uuid primary key default gen_random_uuid(), name text not null, company text, review text not null, featured boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.enquiries (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text not null default '', subject text not null, message text not null, status text not null default 'unread' check(status in ('unread','read','closed')), created_at timestamptz not null default now());
create table if not exists public.media (id uuid primary key default gen_random_uuid(), url text not null, alt text not null default '', created_at timestamptz not null default now());
create table if not exists public.site_settings (id uuid primary key default gen_random_uuid(), site_name text not null, phone text not null default '', email text not null default '', address text not null default '', logo text not null default '/logo/logo.png', favicon text, footer_text text not null default '', facebook text, linkedin text, instagram text, seo_title text not null default '', seo_description text not null default '', created_at timestamptz not null default now(), updated_at timestamptz not null default now());

-- Future LMS tables: prepared now, no public LMS UI yet.
create table if not exists public.students (id uuid primary key default gen_random_uuid(), user_id uuid unique references auth.users(id) on delete set null, full_name text not null, email text not null, created_at timestamptz not null default now());
create table if not exists public.instructors (id uuid primary key default gen_random_uuid(), user_id uuid unique references auth.users(id) on delete set null, full_name text not null, bio text, created_at timestamptz not null default now());
create table if not exists public.modules (id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses(id) on delete cascade, title text not null, sort_order integer not null default 0, created_at timestamptz not null default now());
create table if not exists public.lessons (id uuid primary key default gen_random_uuid(), module_id uuid not null references public.modules(id) on delete cascade, title text not null, content text not null default '', sort_order integer not null default 0, created_at timestamptz not null default now());
create table if not exists public.enrollments (id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade, course_id uuid not null references public.courses(id) on delete cascade, status text not null default 'active', progress numeric(5,2) not null default 0, created_at timestamptz not null default now(), unique(student_id,course_id));
create table if not exists public.certificates (id uuid primary key default gen_random_uuid(), enrollment_id uuid not null unique references public.enrollments(id) on delete cascade, certificate_number text not null unique, issued_at timestamptz not null default now());
create table if not exists public.quizzes (id uuid primary key default gen_random_uuid(), lesson_id uuid references public.lessons(id) on delete cascade, title text not null, questions jsonb not null default '[]'::jsonb, created_at timestamptz not null default now());

-- Public bucket for reusable CMS assets.
insert into storage.buckets (id,name,public) values ('media','media',true) on conflict (id) do update set public=true;

-- Enable RLS on all exposed tables.
alter table public.admin_users enable row level security;
alter table public.course_categories enable row level security; alter table public.courses enable row level security; alter table public.bookings enable row level security; alter table public.blog_categories enable row level security; alter table public.blog_posts enable row level security; alter table public.testimonials enable row level security; alter table public.enquiries enable row level security; alter table public.media enable row level security; alter table public.site_settings enable row level security;
alter table public.students enable row level security; alter table public.instructors enable row level security; alter table public.modules enable row level security; alter table public.lessons enable row level security; alter table public.enrollments enable row level security; alter table public.certificates enable row level security; alter table public.quizzes enable row level security;

-- Public website reads.
create policy "Public read categories" on public.course_categories for select using (true);
create policy "Public read courses" on public.courses for select using (true);
create policy "Public read published posts" on public.blog_posts for select using (status='published' or public.is_admin());
create policy "Public read blog categories" on public.blog_categories for select using (true);
create policy "Public read featured testimonials" on public.testimonials for select using (featured=true or public.is_admin());
create policy "Public read settings" on public.site_settings for select using (true);
create policy "Public create bookings" on public.bookings for insert with check (true);
create policy "Public create enquiries" on public.enquiries for insert with check (true);
create policy "Public read media" on public.media for select using (true);

-- Admin CRUD for CMS tables.
do $$ declare t text; begin foreach t in array array['course_categories','courses','bookings','blog_categories','blog_posts','testimonials','enquiries','media','site_settings','students','instructors','modules','lessons','enrollments','certificates','quizzes'] loop execute format('create policy "Admin manage %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())',t); end loop; end $$;
create policy "Admin read admin list" on public.admin_users for select using (public.is_admin());

-- Storage policies. Public files can be read; only admins can change media.
create policy "Public read media objects" on storage.objects for select using (bucket_id='media');
create policy "Admin upload media objects" on storage.objects for insert with check (bucket_id='media' and public.is_admin());
create policy "Admin update media objects" on storage.objects for update using (bucket_id='media' and public.is_admin()) with check (bucket_id='media' and public.is_admin());
create policy "Admin delete media objects" on storage.objects for delete using (bucket_id='media' and public.is_admin());
