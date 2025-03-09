import { useState } from "react";
import { Employee } from "./types/types.ts";
import style from "./styles/header.module.css";
import { Button } from "./ui/button/button.tsx";
import { TextInput } from "./ui/text-input/text-input.tsx";
import { Checkbox } from "./ui/cheack-box/cheack-box.tsx";
import css from '../components/ui/text-input/inputText.module.css'

type Props = {
    employee?: Employee,
    onSave: (employee: Employee) => void,
    onClose: () => void,
    onDelete?: (id: string) => void,
};

export function SaveEmployee({employee, onSave, onClose, onDelete}: Props) {
    const [name, setName] = useState(employee?.name || "");
    const [company, setCompany] = useState(employee?.company || "");
    const [group, setGroup] = useState(employee?.group || "");
    const [active, setActive] = useState(employee?.active || false);

    const handleSubmit = () => {
        if (!name.trim() || !company.trim() || !group.trim()) return;

        const newEmployee: Employee = {
            id: employee ? employee.id : crypto.randomUUID(),
            name,
            company,
            group,
            active,
        };

        onSave(newEmployee);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className={style.addAndEdit}>
            <h3 className={style.title}>{employee ? "Редактировать сотрудника" : "Добавить сотрудника"}</h3>

            <div className={style.EditAndAdd}>
                <span className={style.spanSave}>ФИО</span>
                <TextInput className={css.text} value={name} onChange={setName} required/>
            </div>
            <div className={style.companyEditAndAdd}>
                <span className={style.spanSave}>Компания</span>
                <TextInput className={css.text} value={company} onChange={setCompany} required/>
            </div>
            <div className={style.groupEditAndAdd}>
                <span className={style.spanSave}>Группа</span>
                <TextInput className={css.text} value={group} onChange={setGroup} required/>
            </div>
            <Checkbox checked={active} onChange={setActive} label="Присутствует"/>
            <div className={style.buttonEditAndAdd}>
                {/*todo необходимо сделать кнопку.*/}
                <Button onClick={handleSubmit} color="success" text={employee ? "Сохранить" : "Добавить"}/>
                <Button color="default" text={'Отмена'} onClick={onClose}/>
                {employee && onDelete && (
                    <button type="button" onClick={() => onDelete(employee.id)}>Удалить</button>
                )}
            </div>
        </form>
    );
}