import type { Metadata } from 'next';
import { ButtonLink } from '@/components/site/button-link';
import { Container } from '@/components/site/container';
import { PageHero } from '@/components/site/page-hero';
import { PngIcon } from '@/components/site/png-icon';
import { SectionHeading } from '@/components/site/section-heading';

export const metadata: Metadata = {
  title: 'Corporate Training',
  description: 'Group and corporate computer training programmes in Port Elizabeth (Gqeberha).'
};

const programmes = [
  ['users', 'Group programmes', 'Plan training for teams with shared learning goals.'],
  ['building', 'Organisation-focused delivery', 'Support skills development priorities in a professional training environment.'],
  ['presentation', 'Practical course options', 'Choose computer literacy, Microsoft Office and workplace skills programmes.']
] as const;

export default function CorporateTrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Corporate and group training"
        title="Practical skills development for teams and organisations"
        text="Plan structured computer and workplace training for employees, government teams, schools, businesses and NGOs."
      />
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Training shaped around your organisation’s needs"
            text="New Era can discuss your team’s current level, your training priorities and the most suitable delivery option."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {programmes.map(([icon, title, text]) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-6">
                <PngIcon name={icon} tone="brand" size={32} />
                <h2 className="mt-4 text-xl font-bold text-gray-900">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y border-gray-200 bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Suitable for a range of organisations</h2>
            <ul className="mt-6 grid gap-3">
              {[
                'Businesses and corporate teams',
                'Government departments and public-sector employees',
                'Schools and education organisations',
                'Non-governmental organisations',
                'Teams requiring tailored skills development'
              ].map((item) => (
                <li key={item} className="flex gap-2 text-gray-600">
                  <PngIcon name="check-circle" tone="accent" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-brand p-8 text-white">
            <h2 className="text-2xl font-bold">Discuss your training requirements</h2>
            <p className="mt-4 leading-7 text-blue-100">Tell us about your team, your preferred course area and the outcomes you want to achieve.</p>
            <div className="mt-6"><ButtonLink href="/contact" variant="secondary">Request a Consultation</ButtonLink></div>
          </div>
        </Container>
      </section>
    </main>
  );
}
