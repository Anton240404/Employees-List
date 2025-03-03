import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {Filter} from "./filters.tsx";
import {EditeEmployee} from "./edite-employee.tsx";
import {AddEmployees} from "./add-employee.tsx";
import {Employee} from "./types/types.ts";
import style from "./styles/header.module.css"
import logo from '../assets/logo.svg'
import {initialEmployees} from "./employees/initial-employees.tsx";

Modal.setAppElement("#root");

export function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const savedEmployees = localStorage.getItem("employees");
        return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
    });
    const [filters, setFilters] = useState({name: ''})
    const [showPopup, setShowPopup] = useState(false);
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const filteredEmployees = employees.filter((emp) => {
        return (
            (emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (activeFilter === null || emp.active === activeFilter) // Добавлена фильтрация по имени
        );
    });
    // Открыть попап для добавления сотрудника
    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setShowPopup(true);
    };
    // Открыть попап для редактирования сотрудника
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowPopup(true);
    };

    // Сохранение сотрудника (нового или обновленного)
    const getUpdatedAndAddEmployees = (employee: Employee) => {
        if (selectedEmployee) {
            return employees.map((emp) => (emp.id === employee.id ? employee : emp));
        } else {
            return [...employees, { ...employee, id: crypto.randomUUID(), numeric: employees.length + 1 }];
        }
    };

    const handleSaveEmployee = (employee: Employee) => {
        const newValue = getUpdatedAndAddEmployees(employee);
        setEmployees(newValue);
        setShowPopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.nameCompany}>
                <img className={style.icon} src={logo} alt={'name company'} />
                <div className={style.add}>
                    <Filter onFilterChange={(name) => setFilters({name})}/>
                    <button className={style.buttonAdd} onClick={handleAddEmployee}>Добавить</button>
                </div>
                <div className={style.guests}>
                    <div>Посетители</div>
                    <div>280/35</div>
                </div>
            </div>

            <div className={style.header}>
                <span>Номер</span>
                <span>ФИО</span>
                <span>Компания</span>
                <span>Группа</span>
                <span>Присутствие</span>
            </div>

            <div className={style.containerList}>
                <ul>
                    {filteredEmployees.map((emp, i) => (
                        <li key={emp.id} className={style.item} onClick={() => handleEditEmployee(emp)}>
                            <div className={style.card}>
                                <p>{i + 1} </p>
                                <p>{emp.name}</p>
                                <p>{emp.company}</p>
                                <p>{emp.group}</p>
                                <span className={emp.active ? style.green : style.red}></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal
                className={style.modal}
                isOpen={showPopup}
                onRequestClose={() => setShowPopup(false)}
            >
                <div>
                    {selectedEmployee ? (
                        <EditeEmployee employee={selectedEmployee} onSave={handleSaveEmployee}
                                       onClose={() => setShowPopup(false)}/>
                    ) : (
                        <AddEmployees onSave={handleSaveEmployee} onClose={() => setShowPopup(false)}/>
                    )}
                </div>
            </Modal>
            <div className={style.conteinerFooter}>
                <div className={style.footer}>
                    <h1>Фильтровать по:</h1>
                        <p  onClick={() => setActiveFilter(false)}>Отсутствующим</p>
                        <p  onClick={() => setActiveFilter(true)}>Присутствующим</p>
                        <button className={style.footerButton} onClick={() => setActiveFilter(null)}>Без фильтра</button>
                </div>
            </div>
        </div>

    );
}