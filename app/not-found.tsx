import { ButtonLink } from '@/components/site/button-link';
import { Container } from '@/components/site/container';
export default function NotFound(){return <main><Container className="py-24 text-center"><p className="text-sm font-bold uppercase tracking-wider text-brand-secondary">404</p><h1 className="mt-3 text-4xl font-bold text-gray-950">Page not found</h1><p className="mt-4 text-gray-600">The page you requested could not be found.</p><div className="mt-7"><ButtonLink href="/">Return home</ButtonLink></div></Container></main>}
