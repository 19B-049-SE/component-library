import React, { useState } from 'react';

export type InputFieldVariant = 'filled' | 'outlined' | 'ghost';
export type InputFieldSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: InputFieldVariant;
  size?: InputFieldSize;
  type?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const sizeClasses = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-3 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  const variantClasses = {
    filled: 'bg-gray-100 focus:bg-white',
    outlined: 'border border-gray-300 focus:border-blue-500',
    ghost: 'border-b border-gray-300 focus:border-blue-500',
  };

  const inputClasses = [
    'w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors',
    sizeClasses[size],
    variantClasses[variant],
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : '',
  ].join(' ');

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          className={`block text-sm font-medium ${
            invalid ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          </div>
        )}
        {showClearButton && value && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {showPasswordToggle && type === 'password' && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
          >
            {inputType === 'password' ? '👁️' : '🔒'}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <p id={`${label}-help`} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
      {errorMessage && invalid && (
        <p id={`${label}-help`} className="text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;