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

    return (
        <div className="wrapper-tasks">
            {tasks?.map((task, index) => <Task task={task} key={task.id}/>)}
        </div>
    );
};

export default ListTasks;