import React from 'react';
import style from "../search-input/input.module.css"


type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    onFilterChange: (value: string) => void;
    placeholder?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export function SearchInput({ value, onChange, onFilterChange, placeholder, onKeyDown }: SearchInputProps) {
    return (
        <input
            type="text"
            className={style.input}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
                const newValue = e.target.value;
                onChange(newValue);
                onFilterChange(newValue);
            }}
            onKeyDown={onKeyDown}
        />
    );
}
