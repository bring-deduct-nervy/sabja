import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', children, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary:
        'bg-luxury-navy-900 text-white hover:bg-luxury-navy-800 focus:ring-luxury-navy-700',
      secondary:
        'bg-luxury-gold-500 text-luxury-navy-900 hover:bg-luxury-gold-600 focus:ring-luxury-gold-400',
      outline:
        'border-2 border-luxury-navy-900 text-luxury-navy-900 hover:bg-luxury-navy-900 hover:text-white focus:ring-luxury-navy-700',
      ghost:
        'text-luxury-navy-900 hover:bg-luxury-cream-200 focus:ring-luxury-navy-700',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
