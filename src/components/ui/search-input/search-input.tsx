import React from 'react';


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
           /* className={`${css.textInput} ${css.searchInput}`}*/
            value={value}
            placeholder={placeholder || "Поиск по имени"}
            onChange={(e) => {
                const newValue = e.target.value;
                onChange(newValue);
                onFilterChange(newValue);
            }}
            onKeyDown={onKeyDown}
        />
    );
}
