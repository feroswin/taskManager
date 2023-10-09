import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import "../styles/Navbar.css"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/slices/user.slice";
import {getMe} from "../store/actions/user.action";


const Navbar = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getMe())
    }, []);

    return (
        <nav>
            <div className="container">
                <div className="inner-nav">
                    <div className="app-name">TaskManager</div>
                    <div className="navbar-links">
                        <Link to="/" className="navbar-link">Главная</Link>
                        {user && <Link to="/cabinet" className="navbar-link">Личный кабинет</Link>}
                        {!user
                            ? <Link to="/login" className="btn-auth">Вход</Link>
                            : <Link to="/login" className="btn-auth" onClick={() => dispatch(logout())}>Выйти</Link>}
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;