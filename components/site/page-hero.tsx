import { Container } from '@/components/site/container';

export function PageHero({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <section className="border-b border-blue-100 bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Container className="py-16 sm:py-20">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">{text}</p>
      </Container>
    </section>
  );
}
