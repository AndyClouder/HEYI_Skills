import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { User } from 'lucide-react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const sizeStyles: Record<AvatarProps['size'], string> = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
  xl: 'w-16 h-16 text-xl',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt, size = 'md', fallback, className, ...props },
    ref
  ) => {
    const getInitials = (name?: string) => {
      if (!name) return '';
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          'rounded-full overflow-hidden',
          'bg-primary text-white font-semibold',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : fallback ? (
          <span>{fallback}</span>
        ) : (
          <User size={size === 'xl' ? 32 : size === 'lg' ? 20 : 16} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
