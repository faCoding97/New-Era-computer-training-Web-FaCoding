import Image from 'next/image';
import { cn } from '@/lib/utils';

type IconTone = 'brand' | 'accent' | 'gray' | 'white';

type PngIconProps = {
  name: string;
  tone?: IconTone;
  size?: number;
  className?: string;
  alt?: string;
};

export function PngIcon({ name, tone = 'brand', size = 24, className, alt = '' }: PngIconProps) {
  return (
    <Image
      src={`/icons/${tone}/${name}.png`}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={cn('shrink-0 object-contain', className)}
    />
  );
}
