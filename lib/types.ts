export type FAQ = { question: string; answer: string };

export type CourseCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  duration: string;
  requirements: string[];
  learning_outcomes: string[];
  who_should_attend: string[];
  benefits: string[];
  category_id?: string | null;
  featured_image?: string | null;
  og_image?: string | null;
  is_featured: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  faqs: FAQ[];
  created_at?: string;
  course_categories?: CourseCategory | null;
};

export type BlogCategory = { id: string; name: string; slug: string };

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  og_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  status: 'draft' | 'published';
  tags: string[];
  category_id?: string | null;
  created_at: string;
  blog_categories?: BlogCategory | null;
};

export type Testimonial = {
  id: string;
  name: string;
  company?: string | null;
  review: string;
  featured: boolean;
};

export type SiteSettings = {
  id?: string;
  site_name: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
  favicon?: string | null;
  footer_text: string;
  facebook?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  seo_title: string;
  seo_description: string;
};

export type SiteData = {
  settings: SiteSettings;
  categories: CourseCategory[];
  courses: Course[];
  testimonials: Testimonial[];
  posts: BlogPost[];
};
