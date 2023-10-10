import React, {Fragment} from 'react';

const CheckBox = ({isComplete ,onChange}) => {
    return (
        <Fragment>
            <div className="checkbox-wrapper-5">
                <div className="check">
                    <input name="is_complete" checked={isComplete} onChange={onChange} id="check-5" type="checkbox"></input>
                    <label htmlFor="check-5"></label>
                </div>
            </div>
        </Fragment>
    );
};

export default CheckBox;