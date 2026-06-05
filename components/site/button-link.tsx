import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ButtonLink({ href, children, variant = 'primary', className }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'outline'; className?: string }) {
  return (
    <Link href={href} className={cn('inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2', variant === 'primary' && 'bg-brand text-white hover:bg-brand-secondary', variant === 'secondary' && 'bg-accent text-gray-950 hover:bg-amber-400', variant === 'outline' && 'border border-brand bg-white text-brand hover:bg-blue-50', className)}>
      {children}
    </Link>
  );
}
