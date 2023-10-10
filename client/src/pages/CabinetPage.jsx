import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../store/actions/user.action";
import {Link, useNavigate} from "react-router-dom";
import avatar from "../assets/gustavo.jpg"
import ListTasks from "../components/ListTasks";
import Button from "../generic/Button";

const CabinetPage = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getMe)
        if (!user) {
            navigate("/login")
        }
    },[]);



    return (
        <Fragment>
            <div className="wrapper-account">
                <img src={avatar} alt="Аватарка пользователя" className="avatar"/>
                <div className="username">{user?.username}</div>
            </div>
            <Link to="/add-task" className="btn-add-task"><Button className="btn">Добавить</Button></Link>
            <ListTasks/>
        </Fragment>
    );
};

export default CabinetPage;