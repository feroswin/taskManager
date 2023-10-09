import React, {Fragment} from 'react';

const Input = ({type, placeholder = '', value = '', onChange = null}) => {
    return (
        <Fragment>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="input"/>
        </Fragment>
    );
};

export default Input;