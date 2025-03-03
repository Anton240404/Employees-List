import {useState} from "react";
import {Employee} from "./types/types.ts";
import style from "./styles/header.module.css"

type AddEmployeeProps = {
    onSave: (employee:Employee) => void,
    onClose: () => void
}

export function AddEmployees({onSave, onClose}:AddEmployeeProps) {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [group, setGroup] = useState("");
    const [active, setActive] = useState<boolean>(false);
    const handleSubmit = () => {
        if (!name.trim() || !company.trim() || !group.trim()) return;

        const newEmployee: Employee = {
           id: crypto.randomUUID(),
           name,
           company,
           group,
           active,
        };

        onSave(newEmployee);
        onClose();
    };

    return (
        <div className={style.addAndEdit}>
            <h2>Добавить сотрудника</h2>
            <div className={style.nameEditAndAdd}>
                <span>ФИО</span>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className={style.companyEditAndAdd}>
                <span>Компания</span>
                <input
                    type="text"
                    placeholder="Компания"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}/>
            </div>
            <div className={style.groupEditAndAdd}>
                <span>Группа</span>
                <input
                    type="text"
                    placeholder="Группа"
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
};
