import { useState, useEffect } from "react";
import { Employee } from "./types/types.ts";
import style from "./styles/header.module.css";
import { Button } from "./ui/button/button.tsx";
import { TextInput } from "./ui/text-input/text-input.tsx";
import { Checkbox } from "./ui/cheack-box/cheack-box.tsx";
import css from './ui/text-input/input-text.module.css';

type Props = {
    employee?: Employee,
    onSave: (employee: Employee) => void,
    onClose: () => void,
    onDelete?: (id: string) => void,
};

export function SaveEmployee({ employee, onSave, onClose, onDelete }: Props) {
    const [name, setName] = useState(employee?.name || "");
    const [company, setCompany] = useState(employee?.company || "");
    const [group, setGroup] = useState(employee?.group || "");
    const [active, setActive] = useState(employee?.active || false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    const isEditMode = Boolean(employee);
    const [isFormValid, setIsFormValid] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            setIsFormValid(true);
            return;
        }

        const isValid = name.trim() !== '' && company.trim() !== '' && group.trim() !== '';
        setIsFormValid(isValid);
    }, [name, company, group, isEditMode]);

    const handleSubmit = () => {
        if (!isEditMode && !isFormValid) return;

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
            <h3 className={style.title}>
                {isConfirmingDelete ? "Вы точно хотите удалить?" : isEditMode ? "Редактировать сотрудника" : "Добавить сотрудника"}
            </h3>

            {!isConfirmingDelete && (
                <>
                    <div className={style.EditAndAdd}>
                        <span className={style.spanSave}>ФИО</span>
                        <TextInput className={css.text} value={name} onChange={setName} required/>
                    </div>
                    <div className={style.EditAndAdd}>
                        <span className={style.spanSave}>Компания</span>
                        <TextInput className={css.text} value={company} onChange={setCompany} required/>
                    </div>
                    <div className={style.EditAndAdd}>
                        <span className={style.spanSave}>Группа</span>
                        <TextInput className={css.text} value={group} onChange={setGroup} required/>
                    </div>
                    <Checkbox checked={active} onChange={setActive} label="Присутствует"/>
                </>
            )}

            <div className={style.buttonEditAndAdd}>
                {!isConfirmingDelete ? (
                    <>
                        <Button
                            type={'submit'}
                            color="success"
                            text={isEditMode ? "Сохранить" : "Добавить"}
                            disabled={!isEditMode && !isFormValid}
                        />
                        <Button color="default" text={'Отмена'} onClick={onClose}/>
                        {isEditMode && onDelete && (
                            <Button color="danger" text="Удалить" onClick={() => setIsConfirmingDelete(true)} />
                        )}
                    </>
                ) : (
                    <>
                        <Button
                            color="danger"
                            text="Удалить"
                            onClick={() => {
                                onDelete?.(employee!.id);
                                onClose();
                            }}
                        />
                        <Button
                            color="default"
                            text="Отмена"
                            onClick={() => setIsConfirmingDelete(false)}
                        />
                    </>
                )}
            </div>
        </form>
    );
}