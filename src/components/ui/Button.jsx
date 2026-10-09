import React from 'react';

const VARIANTS = {
  primary:
    'bg-[#141414] hover:bg-[#262626] active:bg-[#000000] text-white focus-visible:ring-2 focus-visible:ring-[#141414]',
  outline:
    'bg-white hover:bg-[#f3f3f3] active:bg-[#e8e8e8] text-[#141414] border border-[#e0e0e0] focus-visible:ring-2 focus-visible:ring-[#141414]',
  soft:
    'bg-[#f3f3f3] hover:bg-[#e5e5e5] active:bg-[#d4d4d4] text-[#141414] focus-visible:ring-2 focus-visible:ring-[#141414]',
  accent:
    'bg-[#0066ff] hover:bg-[#0052cc] active:bg-[#003d99] text-white focus-visible:ring-2 focus-visible:ring-[#0066ff]',
  ghost:
    'text-[#707070] hover:text-[#141414] hover:bg-[#f3f3f3] focus-visible:ring-2 focus-visible:ring-[#707070]',
  danger:
    'bg-[#fdf2f2] hover:bg-[#fde8e8] text-[#d92d20] border border-[#fecdca] focus-visible:ring-2 focus-visible:ring-[#d92d20]',
};

const SIZES = {
  sm: 'h-8 px-3.5 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  icon: 'w-9 h-9 p-0',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 select-none ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
