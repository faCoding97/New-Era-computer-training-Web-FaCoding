import type { Metadata } from 'next';
import { BlogCard } from '@/components/site/blog-card';
import { Container } from '@/components/site/container';
import { PageHero } from '@/components/site/page-hero';
import { getPosts } from '@/lib/content';
export const metadata: Metadata={title:'Blog',description:'Read practical computer training and skills development articles from New Era.'};
export default async function BlogPage(){const posts=await getPosts();return <main><PageHero eyebrow="Knowledge centre" title="Training guidance and workplace skills articles" text="Explore practical insights for learners, job seekers, employees and organisations."/><section className="py-16"><Container><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map(post=><BlogCard key={post.id} post={post}/>)}</div></Container></section></main>}
