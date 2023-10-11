import React, {useEffect, useState} from 'react';
import Task from "./Task";
import instanceAxios from "../axios";

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

    return (
        <div className="wrapper-tasks">
            {tasks?.map((task) => <Task task={task} key={task.id} onDelete={deleteTask}/>)}
        </div>
    );
};

export default ListTasks;