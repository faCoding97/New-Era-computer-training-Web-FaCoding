import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { PngIcon } from '@/components/site/png-icon';
import { formatDate } from '@/lib/utils';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Image src={post.featured_image || '/images/blog-generic.png'} alt="" width={720} height={420} className="aspect-[12/7] w-full object-cover" />
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">{formatDate(post.created_at)}</p>
        <h3 className="mt-2 text-xl font-bold text-gray-900">{post.title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand-secondary">
          Read article <PngIcon name="arrow-right" tone="brand" size={16} />
        </Link>
      </div>
    </article>
  );
}
