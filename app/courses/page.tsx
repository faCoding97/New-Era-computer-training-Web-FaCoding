import type { Metadata } from 'next';
import { BookingForm } from '@/components/forms/booking-form.client';
import { Container } from '@/components/site/container';
import { CourseCard } from '@/components/site/course-card';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { getCategories, getCourses } from '@/lib/content';

export const metadata: Metadata = { title: 'Courses', description: 'Browse computer training and skills development courses from New Era in Port Elizabeth.' };
export default async function CoursesPage({ searchParams }: { searchParams: { category?: string } }) {
  const [courses, categories] = await Promise.all([getCourses(), getCategories()]);
  const activeCategory = categories.find((item) => item.slug === searchParams.category);
  const visibleCourses = activeCategory ? courses.filter((course) => course.category_id === activeCategory.id) : courses;
  return <main><PageHero eyebrow="Course catalogue" title="Computer training and workplace skills courses" text="Choose a practical programme for your current level, your career goals or your organisation’s training needs."/><section id="courses" className="py-16 sm:py-20"><Container><div className="mb-8 flex flex-wrap gap-2"><a href="/courses" className={`rounded-full border px-4 py-2 text-sm font-semibold ${!activeCategory ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand'}`}>All courses</a>{categories.map((category) => <a key={category.id} href={`/courses?category=${category.slug}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeCategory?.id === category.id ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand'}`}>{category.name}</a>)}</div>{visibleCourses.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleCourses.map(course=><CourseCard key={course.id} course={course}/>)}</div> : <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">No courses are currently listed in this category. Contact New Era to discuss a suitable training option.</p>}</Container></section><section id="booking" className="border-t border-gray-200 bg-white py-16"><Container className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"><SectionHeading eyebrow="Book training" title="Request a course booking" text="Send your details and preferred training date. The New Era team can confirm availability and discuss the right course option with you."/><BookingForm courses={courses}/></Container></section></main>;
}
