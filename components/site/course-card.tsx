import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { PngIcon } from '@/components/site/png-icon';

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-institution">
      <Image src={course.featured_image || '/images/course-generic.png'} alt="" width={720} height={420} className="aspect-[12/7] w-full object-cover" />
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
          <PngIcon name="clock" tone="brand" size={16} />
          {course.duration}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{course.excerpt}</p>
        <Link href={`/courses/${course.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-secondary">
          View course <PngIcon name="arrow-right" tone="brand" size={16} />
        </Link>
      </div>
    </article>
  );
}
