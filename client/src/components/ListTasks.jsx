import React, {useEffect, useState} from 'react';
import Task from "./Task";
import instanceAxios from "../axios";
import Button from "../generic/Button";
import task from "./Task";

const ListTasks = () => {

    const [tasks, setTasks] = useState([])
    const [countExpiredTasks, setCountExpiredTasks] = useState(0)

    useEffect(() => {
        instanceAxios.get("/tasks" ).then(({data}) => {
            if (data.data) {
                setTasks(data.data)
                setCountExpiredTasks(data.count_expired)
            }
        })
    }, []);

    function deleteTask (id) {
        setTasks(tasks.filter((el) => el.id !== id))
    }


    function sortedTask() {
        if (tasks.length) {
            const sortedTasks = [...tasks]
            sortedTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setTasks(sortedTasks)
        }

    }

    function reversSortedTask() {
        if (tasks.length) {
            const sortedTasks = [...tasks]
            sortedTasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            setTasks(sortedTasks)
        }
    }


    return (
        <div className="wrapper-tasks">
            <div className="wrapper-sort">
                <Button className="btn" onClick={sortedTask}>По дате создания: Новые</Button>
                <Button className="btn" onClick={reversSortedTask}>По дате создания: Старые</Button>
            </div>
            <div className="push">{countExpiredTasks ? `Количество: ${countExpiredTasks}. Эти задачи ожидают вашего выполнения до завтрашнего дня`: "У вас нет задач, которые должны быть выполнены до завтра"}</div>
            {tasks?.map((task) => <Task task={task} key={task.id} onDelete={deleteTask}/>)}
        </div>
    );
};

export default ListTasks;