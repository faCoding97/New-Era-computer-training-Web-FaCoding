import type { Testimonial } from '@/lib/types';
import { PngIcon } from '@/components/site/png-icon';

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <PngIcon name="quote" tone="accent" size={32} />
      <blockquote className="mt-4 text-sm leading-7 text-gray-700">“{item.review}”</blockquote>
      <figcaption className="mt-5 border-t border-gray-100 pt-4">
        <p className="font-bold text-gray-900">{item.name}</p>
        {item.company ? <p className="text-xs uppercase tracking-wider text-gray-500">{item.company}</p> : null}
      </figcaption>
    </figure>
  );
}
