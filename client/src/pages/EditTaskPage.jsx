import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getMe} from "../store/actions/user.action";
import {useDispatch, useSelector} from "react-redux";
import instanceAxios from "../axios";
import Input from "../generic/Input";
import Button from "../generic/Button";
import CheckBox from "../generic/CheckBox";
import {getFormatDate} from "../index";

const EditTaskPage = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user} = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [isComplete, setIsComplete] = useState('')

    const params = useParams()
    const idTask = params.id

    useEffect(() => {
        dispatch(getMe)
        if (!user) {
            navigate("/login")
        }
    },[]);


    useEffect(() => {
        instanceAxios.get(`/tasks/${idTask}`).then(({data}) => {

            // console.log(data.data.deadline)
            setTitle(data.data.title)
            setDescription(data.data.description)
            setDeadline(data.data.deadline)
            setIsComplete(data.data.is_complete)

        })
    }, []);

    function submitData (event) {
        event.preventDefault()
        instanceAxios.put(`tasks/update-task/${idTask}`, {
            title: title,
            description: description,
            deadline: deadline,
            is_complete: isComplete
        }).then(({data}) => {
            navigate("/cabinet")
        })
    }


    return (
        <Fragment>
            <div className="wrapper-edit-task">
                <div className="title-edit">Редактирование задачи</div>
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
                    {/*<div className="checkbox-wrapper-5">*/}
                    {/*    <div className="check">*/}
                    {/*        <input name="is_complete" checked={isComplete} onChange={() => setIsComplete(!isComplete)} id="check-5" type="checkbox"></input>*/}
                    {/*        <label htmlFor="check-5"></label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <CheckBox isComplete={isComplete} onChange={() => setIsComplete(!isComplete)}/>
                </div>
                <Button onClick={submitData} className="btn btn-submit-edit-task">Изменить задачу</Button>
            </form>
        </Fragment>
    );
};

export default EditTaskPage;