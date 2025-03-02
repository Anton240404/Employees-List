import {useState} from "react";
import {Employee} from "./types/types.ts";

type AddEmployeeProps = {
    onSave: (employee:Employee) => void,
    onClose: () => void
}

export function AddEmployees({onSave, onClose}:AddEmployeeProps) {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [group, setGroup] = useState("");
    const [status, setStatus] = useState<"+" | "-">("-");

    const handleSubmit = () => {
        if (!name.trim() || !company.trim() || !group.trim()) return;

    const newEmployee: Employee = {
       id: crypto.randomUUID(),
       name,
       company,
       group,
       status,
    };
        onSave(newEmployee);
        onClose();
    };

    return (
        <div>
            <h2>Добавить сотрудника</h2>
            <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            <input
                type="text"
                placeholder="Компания"
                value={company}
                onChange={(e) => setCompany(e.target.value)}/>
            <input
                type="text"
                placeholder="Группа"
                value={group}
                onChange={(e) => setGroup(e.target.value)}/>
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
