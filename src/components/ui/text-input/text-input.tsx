import React from 'react';
import style from './input-text.module.css';

type TextInputProps = {
    className?: string
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFilterChange?: (value: string) => void;
};

export function TextInput({ value, onChange, placeholder, required, onKeyDown }: TextInputProps) {
    return (
        <input
            type="text"
            className={style.input}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
        />
    );
}