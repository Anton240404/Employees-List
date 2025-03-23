import { useState } from "react";
import { TextInput } from "./ui/text-input/text-input.tsx";

type Props = {
    onFilterChange: (value: string) => void;
};

export function Filter({ onFilterChange }: Props) {
    const [filter, setFilter] = useState("");

    return (
        <TextInput
            value={filter}
            onChange={setFilter}
            onFilterChange={onFilterChange}
            placeholder="Поиск по имени"
        />
    );
}