import React, { useState, FormEvent } from 'react';
import "./style.css";
import PageHeader from '../componentes/PageHeader';
import Input from '../componentes/Input';
import Select from '../componentes/Select';
import TeacherItem, { Teacher } from '../componentes/TeacherItem';
import api from '../../services/api';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubeject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        console.log({subject, week_day, time});
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        console.log(response.data);
        setTeachers(response.data);
    }
    return (
        <div className="container" id="page-teacher-list">
            <PageHeader title="Esses são os Proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={(e) => {setSubeject(e.target.value)}}
                        options={[
                            {value: "Artes", label: "Artes"},
                            {value: "Biologia", label: "Biologia"},
                            {value: "Geografia", label: "Geografia"},
                            {value: "Matemática", label: "Matemática"},
                            {value: "Inglês", label: "Inglês"},
                            {value: "História", label: "História"},
                            {value: "Física", label: "Física"},
                            {value: "Português", label: "Português"},
                            {value: "Química", label: "Química"},
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da Semana" 
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value)}}
                        options={[
                            {value: "0", label: "Domingo"},
                            {value: "1", label: "Segunda"},
                            {value: "2", label: "Terça"},
                            {value: "3", label: "Quarta"},
                            {value: "4", label: "Quinta"},
                            {value: "5", label: "Sexta"},
                            {value: "6", label: "Sábado"},
                        ]}
                    />
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}} />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher )=> {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>

    )
}

export default TeacherList;