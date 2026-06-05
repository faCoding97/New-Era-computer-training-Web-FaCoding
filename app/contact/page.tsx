import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form.client';
import { Container } from '@/components/site/container';
import { PageHero } from '@/components/site/page-hero';
import { PngIcon } from '@/components/site/png-icon';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact New Era Computer Training Centre in Port Elizabeth (Gqeberha).'
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contactItems = [
    ['map-pin', settings.address],
    ['phone', settings.phone],
    ['mail', settings.email]
  ] as const;

  return (
    <main>
      <PageHero
        eyebrow="Contact New Era"
        title="Discuss your training goals with our team"
        text="Contact us about individual courses, group training, corporate programmes or general enquiries."
      />
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-4">
            {contactItems.map(([icon, text]) => (
              <div key={text} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5">
                <PngIcon name={icon} tone="accent" size={24} />
                <p className="text-sm leading-6 text-gray-700">{text}</p>
              </div>
            ))}
          </div>
          <ContactForm />
        </Container>
      </section>
    </main>
  );
}
