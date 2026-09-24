import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface ThemedDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (DropdownOption | string)[];
  placeholder?: string;
  label?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export const ThemedDropdown: React.FC<ThemedDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  className,
  buttonClassName,
  menuClassName,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative inline-block w-full', className)} ref={dropdownRef}>
      {label && (
        <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button styled with theme */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-neutral-200 text-black shadow-xs transition-all outline-none',
          'hover:border-neutral-400 hover:bg-neutral-50/70 active:scale-[0.99]',
          isOpen && 'border-black ring-1 ring-black/5 bg-neutral-50/50',
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-100',
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon}
          <span className={cn('truncate', !selectedOption && 'text-neutral-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180 text-black'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150',
            menuClassName
          )}
          role="listbox"
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors',
                  isSelected
                    ? 'bg-black text-white font-semibold'
                    : 'text-neutral-800 hover:bg-neutral-100 hover:text-black'
                )}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  {option.icon}
                  <div>
                    <div className="truncate">{option.label}</div>
                    {option.sublabel && (
                      <div
                        className={cn(
                          'text-[10px]',
                          isSelected ? 'text-neutral-300' : 'text-neutral-400'
                        )}
                      >
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && <Check className="h-3.5 w-3.5 flex-shrink-0 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
