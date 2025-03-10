import React, { useState } from "react";
import { SearchInput } from "./ui/search-input/search-input.tsx";


type Props = {
    onFilterChange: (searchQuery: string) => void;
}

export function Filter(props: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onFilterChange(searchQuery);
        }
    };

    const handleChange = (value: string) => {
        setSearchQuery(value);
        props.onFilterChange(value);
    };

    return (
        <div>
            <SearchInput
                value={searchQuery}
                onChange={handleChange}
                onFilterChange={handleChange}
                placeholder="Поиск..."
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}