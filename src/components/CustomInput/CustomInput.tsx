import React from "react";

interface ICustomInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  name: string;
  value?: string;
  error?: string | null;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
}

export const CustomInput = React.forwardRef<
  HTMLInputElement,
  ICustomInputProps
>(
  (
    {
      type,
      placeholder,
      className,
      name,
      value,
      error,
      onInput,
      onChange,
      onPressEnter,
    },
    ref
  ) => (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`border px-4 py-2 rounded-md ${
        error
          ? "border-red-500 outline-red-500 focus:outline-0"
          : "border-slate-300 focus:outline-slate-400"
      } ${className}`}
      name={name}
      value={value}
      onInput={onInput}
      onChange={onChange}
      onKeyDown={(e) =>
        e.key === "Enter" ? onPressEnter && onPressEnter() : undefined
      }
    />
  )
);
