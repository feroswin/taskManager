import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../store/actions/user.action";
import {useNavigate} from "react-router-dom";

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
        <div>
            <div>{user?.username}</div>
        </div>
    );
};

export default CabinetPage;