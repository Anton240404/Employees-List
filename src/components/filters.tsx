import React, { useState } from "react";
import { SearchInput } from "./ui/search-input/search-input.tsx";

type Props = {
    onFilterChange: (name: string) => void;
}


export function Filter(props: Props) {
    const [name, setName] = useState('');


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            props.onFilterChange(name);
        }
    };

    return (
        <div>
            <SearchInput
                value={name}
                onChange={setName}
                onFilterChange={props.onFilterChange}
                placeholder="Поиск по имени"
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}