import React, {useEffect, useState} from 'react';
import Button from "../generic/Button";
import {Link, redirect, useNavigate} from "react-router-dom";
import instanceAxios from "../axios";

const Task = ({task, onDelete}) => {

    const [messageDel, setMessageDel] = useState('')


    const navigate = useNavigate()

    console.log(task)

    function deleteTask () {
        onDelete(task.id)
        instanceAxios.delete(`tasks/delete-task/${task.id}`).then(({data}) => {
            setMessageDel(data.message)
        })
    }


    return (
        <div className="task">
            <div className="inner-task">
                <div className="complete-task">
                    {task.is_complete
                        ? <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="green" viewBox="0 0 24 24" width="25" height="25"><path d="m17.588,8.584l.703.71-6.039,5.982c-.483.479-1.121.719-1.758.719-.633,0-1.266-.236-1.749-.709l-3.035-2.991.701-.712,3.034,2.99c.581.568,1.524.565,2.104-.007l6.039-5.982Zm6.412,3.416c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="red" viewBox="0 0 24 24" width="25" height="25"><path d="m16.535,8.172l-3.828,3.828,3.828,3.828-.707.707-3.828-3.828-3.828,3.828-.707-.707,3.828-3.828-3.828-3.828.707-.707,3.828,3.828,3.828-3.828.707.707Zm7.465,3.828c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-1,0c0-6.065-4.935-11-11-11S1,5.935,1,12s4.935,11,11,11,11-4.935,11-11Z"/></svg>}
                </div>
                <div className="content-task">
                    <div className={`status-task ${task.is_complete && "success"}`}>Статус: {task.is_complete ? "выполнено": "в работе"}</div>
                    <div className="title-task">{task.title}</div>
                    <div className="description-task">{task.description}</div>
                </div>
            </div>


            <div className="wrapper-manage-task">
                <div className="date-create">
                    <div>Дата создания: {task.created_at}</div>
                    <div>Дата завершения: {task.deadline ? task.deadline : "Бессрочно"}</div>
                </div>
                <div className="manage-task">
                    <Link to={`/edit-task/${task.id}`}><Button className="btn">Редактировать</Button></Link>
                    <Button onClick={deleteTask} className="btn">Удалить</Button>
                </div>
            </div>
        </div>
    );
};

export default Task;