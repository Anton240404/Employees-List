import {Employee} from "../types/types.ts";

export const initialEmployees: Employee[] = [{
    id:crypto.randomUUID(),
    name: 'Зубенко Михаил Петрович',
    company: 'ООО “АСОЛЬ”',
    group: 'Партнер',
    active: true
},
    {
        id:crypto.randomUUID(),
        name: 'Зубенко Михаил Петрович',
        company: 'ООО “АСОЛЬ”',
        group: 'Прохожий',
        active: false
    },
]