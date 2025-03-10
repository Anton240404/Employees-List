export type Employee = {
    id: string;
    name: string;
    company: string;
    group: string;
    active: boolean;
}
export type SortBy = {
    field: 'name' | 'company' | 'number' | null;
    order: 'asc' | 'desc';
}

