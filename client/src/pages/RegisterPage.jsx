import React, {useState} from 'react';
import Input from "../generic/Input";
import Button from "../generic/Button";
import {Link} from "react-router-dom";
import instanceAxios from "../axios";

const RegisterPage = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [messageRegister, setMessageRegister] = useState(null)
    const [isRegister, setIsRegister] = useState(null)


    function submitData (event) {
        event.preventDefault()
        instanceAxios.post("auth/register", {
            username,
            password
        }).then(result => {
            setMessageRegister(result.data.message)
            setIsRegister(result.data.response)
        })
    }

    return (
        <div>
            <form className="form-auth">
                <div className="title-form-auth">Регистрация</div>
                <Input className="input" type="text" placeholder="Введите никнейм" value={username} onChange={e => setUsername(e.target.value)}/>
                <Input className="input" type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                <Button className="btn" onClick={submitData}>Зарегистрироваться</Button>
                {isRegister && <div className={`message ${isRegister ? "success" : "error"}`}>{messageRegister}</div>}
                <Link to="/login" className="link-redirect">Есть аккаунт? Авторизуйтесь</Link>
            </form>
        </div>
    );
};

export default RegisterPage;