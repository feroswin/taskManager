import React, {Fragment, useEffect, useState} from 'react';
import Input from "../generic/Input";
import CheckBox from "../generic/CheckBox";
import Button from "../generic/Button";
import instanceAxios from "../axios";
import {useNavigate} from "react-router-dom";
import {getMe} from "../store/actions/user.action";
import {useDispatch, useSelector} from "react-redux";

const AddTaskPage = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    const [response, setResponse] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const {user} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getMe)
        if (!user) {
            navigate("/login")
        }
    },[]);

    function submitData (event) {
        event.preventDefault()

        console.log(deadline)
        console.log(title)
        console.log(description)
        console.log(isComplete)
        instanceAxios.post(`tasks/add-task`, {
            title: title,
            description: description,
            deadline: deadline,
            is_complete: isComplete
        }).then(({data}) => {
            console.log(data)
            if (data.response)
                navigate("/cabinet")
            setMessage(data.message)
            setResponse(data.response)
        })
    }

    return (
        <Fragment>
            <div className="wrapper-edit-task">
                <div className="title-edit">Добавление задачи</div>
            </div>
            <form action="">
                <div className="wrapper-input">
                    <div className="label-input">Заголовок задачи</div>
                    <Input name="title" value={title} placeholder="Введите название задачи" type="text" onChange={(e) => setTitle(e.target.value)} className="input input-full-container"/>
                </div>
                <div className="wrapper-input">
                    <div className="label-input">Описание задачи</div>
                    <Input name="description" value={description} placeholder="Введите описание задачи" type="text" onChange={(e) => setDescription(e.target.value)} className="input input-full-container"/>
                </div>
                <div className="wrapper-input">
                    <div className="label-input">Дата завершения задачи</div>
                    <Input name="deadline" value={deadline} placeholder="Введите описание задачи" type="date" onChange={(e) => setDeadline(e.target.value)} className="input date-input"/>
                </div>
                <div className="wrapper-input checkbox">
                    <div className="label-input">Статус выполнения:</div>
                    <CheckBox isComplete={isComplete} onChange={() => setIsComplete(!isComplete)}/>
                </div>
                <Button onClick={submitData} className="btn btn-submit-edit-task">Добавить задачу</Button>
                {message && <div className={`message ${!response && "error"}`}>{message}</div>}
            </form>
        </Fragment>
    );
};

export default AddTaskPage;