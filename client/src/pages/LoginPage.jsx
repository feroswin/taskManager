import React, {useEffect, useState} from 'react';
import Input from "../generic/Input";
import Button from "../generic/Button";
import {Link, redirect, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/actions/user.action";

const LoginPage = () => {


    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const dispatch = useDispatch()
    const {user, response, message} = useSelector(state => state.user)
    const navigate = useNavigate()
    function submitData (event) {
        event.preventDefault()
        dispatch(loginUser({username, password}))
    }

    useEffect(() => {
        if (user)
            navigate("/cabinet")
    }, [user]);

    return (
        <form className="form-auth">
            <div className="title-form-auth">Авторизация</div>
            <Input type="text" placeholder="Введите никнейм" value={username} onChange={e => setUsername(e.target.value)}/>
            <Input type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)}/>
            <Button onClick={submitData}>Авторизоваться</Button>
            {!response && <div className={`message error`}>{message}</div>}
            <Link to="/register" className="link-redirect">Нет аккаунта? Зарегистируйтесь</Link>
        </form>
    );
};

export default LoginPage;