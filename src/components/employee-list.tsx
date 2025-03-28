import {useEffect, useMemo, useState} from 'react';
import {Filter} from "./filters.tsx";
import {Employee} from "./types/types.ts";
import style from "./styles/header.module.css"
import logo from '../assets/logo.svg'
import {initialEmployees} from "./employees/initial-employees.tsx";
import {SaveEmployee} from "./save-employee.tsx";
import {ModalPortal} from "./ui/modal/castom-modal.tsx";
import {Button} from "./ui/button/button.tsx";



export function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedEmployees = localStorage.getItem("employees");
        return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);


    const filteredEmployees = employees.filter((emp) => {

    const searchQueryLower = searchQuery.toLowerCase();

    const matchesSearch =

          emp.name.toLowerCase().includes(searchQueryLower) ||
          emp.company.toLowerCase().includes(searchQueryLower) ||
          emp.group.toLowerCase().includes(searchQueryLower)
          return matchesSearch && (activeFilter === null || emp.active === activeFilter);
    });

    // Функция для открытия попапа добавления сотрудника
    const handleAddEmployee = () => {
        setSelectedEmployee(null);
        setShowPopup(true);
    };

    // Функция для открытия попапа редактирования сотрудника
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowPopup(true);
    };

    // Функция для обновления списка сотрудников (нового или измененного)
    const getUpdatedAndAddEmployees = (employee: Employee) => {
        if (selectedEmployee) {
            return employees.map((emp) => (emp.id === employee.id ? employee : emp));
        } else {
            return [...employees, {...employee, id: crypto.randomUUID()}];
        }
    };

    const handleSaveEmployee = (employee: Employee) => {
        const newValue = getUpdatedAndAddEmployees(employee);
        setEmployees(newValue);
        setShowPopup(false);
    };

    // Подсчет количества присутствующих сотрудников
    const presentEmployees = useMemo(
        () => employees.filter((employee) => employee.active).length,
        [employees]
    )
    // Подсчет отсутствующих
    const absentEmployees = employees.length - presentEmployees;

    // Удаление сотрудника
    const handleDeleteEmployee = (id: string) => {
        setEmployees((emp) => emp.filter((emp) => emp.id !== id));
        setShowPopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.nameCompany}>
                <img className={style.icon} src={logo} alt={'name company'}/>
                <div className={style.add}>
                    <Filter onFilterChange={(query) => setSearchQuery(query)}/>
                    <Button color={'success'} onClick={handleAddEmployee} text={'Добавить'}/>
                </div>
                <div className={style.guests}>
                    <h2>
                        Посетители:
                        <span className={style.greenSpan}>{presentEmployees}</span>/
                        <span className={style.redSpan}>{absentEmployees}</span>
                    </h2>
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
                {filteredEmployees.length === 0 ? (
                    <h2 className={style.noResults}>Совпадений не найдено</h2>
                ) : (
                    <ul>
                        {filteredEmployees.map((emp, i) => (
                            <li key={emp.id} className={style.item} onClick={() => handleEditEmployee(emp)}>
                                <div className={style.header}>
                                    <p>{i + 1} </p>
                                    <p>{emp.name}</p>
                                    <p>{emp.company}</p>
                                    <p>{emp.group}</p>
                                    <span className={emp.active ? style.green : style.red}></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <ModalPortal
                className={style.modal}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
            >
                {selectedEmployee ? (
                    <SaveEmployee
                        employee={selectedEmployee}
                        onSave={handleSaveEmployee}
                        onClose={() => setShowPopup(false)}
                        onDelete={handleDeleteEmployee}
                    />
                ) : (
                    <SaveEmployee
                        onSave={handleSaveEmployee}
                        onClose={() => setShowPopup(false)}/>
                )}
            </ModalPortal>

            <div className={style.footer}>
                <h1 className={style.foterH}>Фильтровать по:</h1>
                <p
                    className={activeFilter === false ? style.activeFilterRed : ''}
                    onClick={() => setActiveFilter(false)}
                >
                    Отсутствующим
                </p>
                <p
                    className={activeFilter === true ? style.activeFilterGreen : ''}
                    onClick={() => setActiveFilter(true)}
                >
                    Присутствующим
                </p>
                <Button color={'default'} onClick={() => setActiveFilter(null)} text={'Без фильтра'}/>
            </div>
        </div>
    );
}
