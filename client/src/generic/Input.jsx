import React, {Fragment} from 'react';

const Input = ({type, placeholder = '', value = '', onChange = "", className}) => {
    return (
        <Fragment>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={className}/>
        </Fragment>
    );
};

export default Input;