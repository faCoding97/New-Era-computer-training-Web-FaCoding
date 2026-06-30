import type { Metadata } from 'next';
import { BookingForm } from '@/components/forms/booking-form.client';
import { ButtonLink } from '@/components/site/button-link';
import { Container } from '@/components/site/container';
import { CourseCard } from '@/components/site/course-card';
import { PageHero } from '@/components/site/page-hero';
import { SectionHeading } from '@/components/site/section-heading';
import { getCategories, getCourses, getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Contact New Era Computer Training Centre for course information in Port Elizabeth.'
};

const courseInfoMessage = 'For information about all our courses, please contact us.';

export default async function CoursesPage({ searchParams }: { searchParams: { category?: string } }) {
  const [courses, categories, settings] = await Promise.all([getCourses(), getCategories(), getSiteSettings()]);
  const activeCategory = categories.find((item) => item.slug === searchParams.category);
  const visibleCourses = activeCategory ? courses.filter((course) => course.category_id === activeCategory.id) : courses;
  const hasCourses = courses.length > 0;

  return (
    <main>
      <PageHero
        eyebrow="Course information"
        title="Computer training and workplace skills courses"
        text="Contact New Era for the latest course availability, programme options and booking details."
      />

      <section id="courses" className="py-16 sm:py-20">
        <Container>
          {hasCourses ? (
            <>
              <div className="mb-8 flex flex-wrap gap-2">
                <a href="/courses" className={`rounded-full border px-4 py-2 text-sm font-semibold ${!activeCategory ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand'}`}>All courses</a>
                {categories.map((category) => (
                  <a key={category.id} href={`/courses?category=${category.slug}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeCategory?.id === category.id ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-brand hover:text-brand'}`}>{category.name}</a>
                ))}
              </div>
              {visibleCourses.length ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visibleCourses.map((course) => <CourseCard key={course.id} course={course} />)}
                </div>
              ) : (
                <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">{courseInfoMessage}</p>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Course information</h2>
              <p className="mt-3 text-lg leading-8 text-gray-600">{courseInfoMessage}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Contact Us</ButtonLink>
                <a href={`tel:${settings.phone}`} className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800 transition hover:border-brand hover:text-brand">Call {settings.phone}</a>
              </div>
            </div>
          )}
        </Container>
      </section>

      {hasCourses ? (
        <section id="booking" className="border-t border-gray-200 bg-white py-16">
          <Container className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <SectionHeading eyebrow="Book training" title="Request a course booking" text="Send your details and preferred training date. The New Era team can confirm availability and discuss the right course option with you." />
            <BookingForm courses={courses} />
          </Container>
        </section>
      ) : null}
    </main>
  );
}
