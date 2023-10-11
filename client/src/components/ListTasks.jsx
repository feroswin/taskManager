import React, {useEffect, useState} from 'react';
import Task from "./Task";
import instanceAxios from "../axios";
import Button from "../generic/Button";
import task from "./Task";

const ListTasks = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        instanceAxios.get("/tasks" ).then(({data}) => {
            setTasks(data.data)
        })
    }, []);

    function deleteTask (id) {
        setTasks(tasks.filter((el) => el.id !== id))
    }


    function sortedTask() {
        const sortedTasks = [...tasks]
        sortedTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setTasks(sortedTasks)
    }

    function reversSortedTask() {
        const sortedTasks = [...tasks]
        sortedTasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        setTasks(sortedTasks)
    }


    return (
        <div className="wrapper-tasks">
            <div className="wrapper-sort">
                <Button className="btn" onClick={sortedTask}>По дате создания: Новые</Button>
                <Button className="btn" onClick={reversSortedTask}>По дате создания: Старые</Button>
            </div>
            {tasks?.map((task) => <Task task={task} key={task.id} onDelete={deleteTask}/>)}
        </div>
    );
};

export default ListTasks;