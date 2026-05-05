import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles: Record<TagProps['variant'], string> = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
};

const sizeStyles: Record<TagProps['size'], string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'default',
      size = 'md',
      removable = false,
      onRemove,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="hover:opacity-70 transition-opacity"
          >
            <X size={14} />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
