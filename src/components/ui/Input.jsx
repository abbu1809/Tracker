import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    className = '',
    id,
    required,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#141414] tracking-tight"
        >
          {label} {required && <span className="text-[#d92d20]">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#707070]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-2xl bg-[#f0f0f0] border-2 border-transparent px-4 py-2.5 text-sm font-medium text-[#141414] placeholder-[#adadad] transition-all focus:bg-white focus:border-[#141414] focus:outline-none disabled:opacity-50 ${
            Icon ? 'pl-11' : ''
          } ${
            error
              ? 'border-[#d92d20] focus:border-[#d92d20]'
              : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-semibold text-[#d92d20]">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-[#707070]">{helperText}</p>
      )}
    </div>
  );
});
