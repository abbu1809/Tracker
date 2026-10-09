import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(function Select(
  {
    label,
    error,
    options = [],
    placeholder,
    className = '',
    id,
    required,
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-[#141414] tracking-tight"
        >
          {label} {required && <span className="text-[#d92d20]">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`w-full appearance-none rounded-2xl bg-[#f0f0f0] border-2 border-transparent px-4 py-2.5 pr-10 text-sm font-semibold text-[#141414] transition-all focus:bg-white focus:border-[#141414] focus:outline-none disabled:opacity-50 cursor-pointer ${
            error
              ? 'border-[#d92d20] focus:border-[#d92d20]'
              : ''
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const label = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {label}
              </option>
            );
          })}
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#707070]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="text-xs font-semibold text-[#d92d20]">{error}</p>}
    </div>
  );
});
