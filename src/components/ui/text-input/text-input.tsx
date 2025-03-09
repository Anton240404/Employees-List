import React from 'react';
import css from './inputText.module.css';

type TextInputProps = {
    className?: string
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function TextInput({ value, onChange, placeholder, required, onKeyDown }: TextInputProps) {
    return (
        <input
            type="text"
            className={css.inputText}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
        />
    );
}