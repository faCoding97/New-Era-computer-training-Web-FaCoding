import Link from 'next/link';
import { BlogCard } from '@/components/site/blog-card';
import { ButtonLink } from '@/components/site/button-link';
import { Container } from '@/components/site/container';
import { CourseCard } from '@/components/site/course-card';
import { JsonLd } from '@/components/site/json-ld';
import { PngIcon } from '@/components/site/png-icon';
import { SectionHeading } from '@/components/site/section-heading';
import { TestimonialCard } from '@/components/site/testimonial-card';
import { getCategories, getCourses, getPosts, getSiteSettings, getTestimonials } from '@/lib/content';
import { absoluteUrl } from '@/lib/utils';

const heroBenefits = [
  ['monitor', 'Practical computer training'],
  ['graduation-cap', 'Structured course pathways'],
  ['users', 'Individual and group learning'],
  ['building', 'Corporate training options']
] as const;

const reasons = [
  ['award', 'Established learning environment', 'A professional training-centre experience focused on clarity, structure and learner support.'],
  ['briefcase', 'Workplace-relevant skills', 'Programmes built around the digital and administrative tasks people use at work.'],
  ['users', 'Flexible training options', 'Training for individual learners, groups, organisations, schools and NGOs.']
] as const;

const courseInfoMessage = 'For information about all our courses, please contact us.';

export default async function HomePage() {
  const [settings, categories, courses, testimonials, posts] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getCourses({ featured: true }),
    getTestimonials(),
    getPosts({ limit: 3 })
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.site_name,
    description: settings.seo_description,
    address: settings.address,
    telephone: settings.phone,
    email: settings.email,
    url: absoluteUrl('/')
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <Container className="grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-secondary">Professional training in Gqeberha</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">Computer Training &amp; Skills Development in Port Elizabeth</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">Professional training programmes designed for students, employees and businesses.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/courses">Course Information</ButtonLink>
              <ButtonLink href="/contact" variant="outline">Contact Us</ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-institution sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-brand">Skills development for real workplace needs</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {heroBenefits.map(([icon, text]) => (
                <div key={text} className="rounded-xl bg-gray-50 p-4">
                  <PngIcon name={icon} tone="accent" size={24} />
                  <p className="mt-3 text-sm font-semibold text-gray-800">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Course information" title="Training programme information" text="Contact New Era for the latest course availability, programme options and booking details." />
          {courses.length ? (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.slice(0, 6).map((course) => <CourseCard key={course.id} course={course} />)}
              </div>
              <div className="mt-8"><ButtonLink href="/courses" variant="outline">View all courses</ButtonLink></div>
            </>
          ) : (
            <div className="mt-10 rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
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

      <section className="border-y border-gray-200 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why New Era" title="Professional training with a practical focus" center />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map(([icon, title, text]) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <PngIcon name={icon} tone="brand" size={32} />
                <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Training categories" title="Choose a pathway that matches your goals" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href="/courses" className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-brand hover:shadow-institution">
                <PngIcon name="check-circle" tone="accent" size={24} />
                <h3 className="mt-4 font-bold text-gray-900">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand py-16 text-white sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-100">Corporate training</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Develop your team’s skills with structured group training</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-100">Discuss your organisation’s goals with us and plan a practical programme for employees, government teams, schools or NGOs.</p>
          </div>
          <ButtonLink href="/corporate-training" variant="secondary">Explore Corporate Training</ButtonLink>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Learner feedback" title="Training experiences built on clarity and support" center />
          <div className="mt-10 grid gap-6 md:grid-cols-3">{testimonials.slice(0, 3).map((item) => <TestimonialCard key={item.id} item={item} />)}</div>
        </Container>
      </section>

      <section className="border-y border-gray-200 bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Knowledge centre" title="Latest articles" text="Practical guidance for learners, job seekers and workplace teams." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Frequently asked questions" title="Plan your next training step" />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              ['How can I get information about available courses?', 'For information about all our courses, please contact New Era directly.'],
              ['Do you offer group training?', 'Yes. We offer group and corporate training options for organisations, schools, government teams and NGOs.'],
              ['Where is New Era based?', 'New Era Computer Training Centre serves learners and organisations in Port Elizabeth (Gqeberha), Eastern Cape.'],
              ['How do I request a booking?', 'Contact New Era with your training needs and our team can discuss availability and programme options with you.']
            ].map(([question, answer]) => (
              <details key={question} className="rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer font-bold text-gray-900">{question}</summary>
                <p className="mt-3 text-sm leading-7 text-gray-600">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gray-900 py-14 text-white">
        <Container className="text-center">
          <h2 className="text-3xl font-bold">Build practical skills for your next opportunity</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">Contact New Era to discuss individual and group training options.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/courses" variant="secondary">Course Information</ButtonLink>
            <ButtonLink href="/contact" className="border border-white bg-transparent hover:bg-white hover:text-gray-900">Contact Us</ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
