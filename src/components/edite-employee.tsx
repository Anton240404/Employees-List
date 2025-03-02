import {useState} from "react";
import {Employee} from "./types/types.ts";

type EditEmployeeProps = {
    employee: Employee
    onSave: (employee:Employee) => void,
    onClose: () => void
}

export function EditeEmployee({employee,onSave, onClose}:EditEmployeeProps) {
    const [name, setName] = useState(employee.name);
    const [company, setCompany] = useState(employee.company);
    const [group, setGroup] = useState(employee.group);
    const [status, setStatus] = useState<"+" | "-">("-");

    const handleSubmit = () => {
        if (!name.trim() || !company.trim() || !group.trim()) return;

        const updatedEmployee: Employee = {
            ...employee,
            name,
            company,
            group,
            status
        };

        onSave(updatedEmployee);
        onClose();
    };
    return  (
        <div>
            <h2>Редактировать сотрудника</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}/>
            <input type="text" value={group} onChange={(e) => setGroup(e.target.value)}/>
            <label>
                Присутствие:
                <input
                    type="checkbox"
                    checked={status === "+"}
                    onChange={(e) => setStatus(e.target.checked ? "+" : "-")}
                />
            </label>
            <button onClick={handleSubmit}>Добавить</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};
