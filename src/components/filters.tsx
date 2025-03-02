import React, {useState} from "react";

type Props = {
    onFilterChange: (name: string) => void;
}


export function Filter(props: Props) {
    const [name, setName] = useState('');

    const handleFilterChange =() => {
        props.onFilterChange(name);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleFilterChange();
        }
    };

    return (
        <div>
            <input
                type='text'
                placeholder="Поиск по имени"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    handleFilterChange()
                }}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}