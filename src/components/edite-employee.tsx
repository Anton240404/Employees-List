import {useState} from "react";
import {Employee} from "./types/types.ts";
import style from "./styles/header.module.css";

type EditEmployeeProps = {
    employee: Employee
    onSave: (employee:Employee) => void,
    onClose: () => void
}

export function EditeEmployee({employee,onSave, onClose}:EditEmployeeProps) {
    const [name, setName] = useState(employee.name);
    const [company, setCompany] = useState(employee.company);
    const [group, setGroup] = useState(employee.group);
    const [active, setActive] = useState<boolean>(employee.active ?? false);

    const handleSubmit = () => {
        if (!name.trim() || !company.trim() || !group.trim()) return;

        const updatedEmployee: Employee = {
            ...employee,
            name,
            company,
            group,
            active
        };

        onSave(updatedEmployee);
        onClose();
    };
    return  (
        <div className={style.addAndEdit}>
            <h2>Редактировать сотрудника</h2>
            <div className={style.nameEditAndAdd}>
                <span>ФИО</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={style.companyEditAndAdd}>
                <span>Компания</span>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}/>
            </div>
            <div className={style.groupEditAndAdd}>
                <span>Группа</span>
                <input
                    type="text"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}/>
            </div>
            <label>
                Присутствие:
                <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                />
            </label>
            <div className={style.buttonEditAndAdd}>
                <button onClick={handleSubmit}>Добавить</button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}
