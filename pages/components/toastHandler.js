import React from 'react';
import { useState } from 'react';
import {Toast} from '@shopify/polaris';

const ToastHandler = (props) => {
    const { toastMsg, toastStatus, handleToastStatus, toastType } = props;
    const [active, setActive] = useState(toastStatus);
    // console.log('ToastHandler Called ' + toastStatus);
    const toggleActive = () => {
        handleToastStatus(false);
        setActive(false);
    }

    //let toastTyp = toastType == 'error' ? 'error' : '';
    
    const toastMarkup = toastStatus ? (
        <Toast error={toastType} content={toastMsg}  onDismiss={toggleActive} />
    ) : null;

    return ( 
        <React.Fragment>
            {toastMarkup}
        </React.Fragment>
    );
}
 
export default ToastHandler;