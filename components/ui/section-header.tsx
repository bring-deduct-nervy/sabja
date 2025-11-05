import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
  ...props
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-12', alignmentClasses[align], className)} {...props}>
      <h2 className="text-display-sm md:text-display-md font-display font-semibold text-luxury-navy-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-luxury-navy-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
