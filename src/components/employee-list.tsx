import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {Filter} from "./filters.tsx";
import {EditeEmployee} from "./edite-employee.tsx";
import {AddEmployees} from "./add-employee.tsx";
import {Employee} from "./types/types.ts";
import style from "./styles/header.module.css"
import logo from '../assets/logo.svg'



const initialEmployees: Employee[] = [{
    numeric:1,
    id:crypto.randomUUID(),
    name: 'Зубенко Михаил Петрович',
    company: 'ООО “АСОЛЬ”',
    group: 'Партнер',
    status: "+"
},
    {
        numeric: 2,
        id:crypto.randomUUID(),
        name: 'Зубенко Михаил Петрович',
        company: 'ООО “АСОЛЬ”',
        group: 'Прохожий',
        status: "-"
    },
]

Modal.setAppElement("#root");

export function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const savedEmployees = localStorage.getItem("employees");
        return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
    });
    const [filters, setFilters] = useState({name: ''})
    const [showPopup, setShowPopup] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    const filteredEmployees = employees.filter((emp) => {
        return (
            (filters.name === "" || emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (statusFilter === null || emp.status === statusFilter) // Добавлена фильтрация по имени
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
    const handleSaveEmployee = (employee: Employee) => {
        if (selectedEmployee) {
            // Редактируем существующего
            setEmployees((prev) =>
                prev.map((emp) => (emp.id === employee.id ? employee : emp))
            );
        } else {
            // Добавляем нового
            setEmployees((prev) => [...prev, { ...employee, id: crypto.randomUUID(), numeric: prev.length + 1 }]);
        }
        setShowPopup(false);
    };

    return (
        <div >
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
                <p>Номер</p>
                <p>ФИО</p>
                <p>Компания</p>
                <p>Группа</p>
                <p>Присутствие</p>
            </div>
            <div>

                <ul className={style.list}>
                    {filteredEmployees.map((emp) => (
                        <li key={emp.id} className={style.item} onClick={() => handleEditEmployee(emp)}>
                            <div className={style.card}>
                                <p>{emp.numeric}</p>
                                <p>{emp.name}</p>
                                <p>{emp.company}</p>
                                <p>{emp.group}</p>
                                <p>{emp.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


            <Modal
                isOpen={showPopup}
                onRequestClose={() => setShowPopup(false)}
            >
                {selectedEmployee ? (
                    <EditeEmployee employee={selectedEmployee} onSave={handleSaveEmployee}
                                   onClose={() => setShowPopup(false)}/>
                ) : (
                    <AddEmployees onSave={handleSaveEmployee} onClose={() => setShowPopup(false)}/>
                )}
            </Modal>
            <div className={style.conteinerFooter}>
                <div className={style.footer}>
                    <h1>Фильтровать по:</h1>
                    <p  onClick={() => setStatusFilter("-")}>Отсутствующим</p>
                    <p  onClick={() => setStatusFilter("+")}>Присутствующим</p>
                    <button onClick={() => setStatusFilter(null)}>Без фильтра</button>
                </div>
            </div>
        </div>
    );
}