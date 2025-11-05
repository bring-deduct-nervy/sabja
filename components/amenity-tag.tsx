import { clsx } from 'clsx';

export interface AmenityTagProps {
  amenity: string;
  variant?: 'default' | 'highlight';
  className?: string;
}

export function AmenityTag({
  amenity,
  variant = 'default',
  className,
}: AmenityTagProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300':
            variant === 'default',
          'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200':
            variant === 'highlight',
        },
        className
      )}
    >
      {amenity}
    </span>
  );
}
