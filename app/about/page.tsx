import type { Metadata } from 'next';
import { Container } from '@/components/site/container';
import { PageHero } from '@/components/site/page-hero';
import { PngIcon } from '@/components/site/png-icon';
import { SectionHeading } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about New Era Computer Training Centre in Port Elizabeth (Gqeberha).'
};

const features = [
  ['book-open-check', 'Practical learning'],
  ['users', 'Learner support'],
  ['building', 'Corporate programmes'],
  ['award', 'Professional standards']
] as const;

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About New Era"
        title="Professional skills development for a changing workplace"
        text="New Era Computer Training Centre provides practical training programmes for individuals, employees and organisations in Port Elizabeth (Gqeberha)."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_.9fr]">
          <div>
            <SectionHeading title="Training that builds confidence and capability" />
            <div className="mt-6 space-y-4 text-base leading-8 text-gray-600">
              <p>Our focus is practical education. Courses are structured to help learners understand essential concepts, practise relevant tasks and apply new skills with confidence.</p>
              <p>New Era supports individual learners, job seekers, office workers, government employees, businesses, schools and NGOs with course options that respond to real training needs.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(([icon, label]) => (
              <div className="rounded-xl border border-gray-200 bg-white p-6" key={label}>
                <PngIcon name={icon} tone="brand" size={32} />
                <p className="mt-4 font-bold text-gray-900">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-gray-200 bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="A structured training-centre experience"
            text="The website and course catalogue are designed around the same principles as the classroom: clear guidance, professional presentation and an accessible pathway to the next step."
          />
        </Container>
      </section>
    </main>
  );
}
