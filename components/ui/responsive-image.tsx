import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  objectFit?: 'cover' | 'contain';
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = 'landscape',
  objectFit = 'cover',
  className,
  ...props
}: ResponsiveImageProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          objectFit === 'cover' ? 'object-cover' : 'object-contain'
        )}
        {...props}
      />
    </div>
  );
}
