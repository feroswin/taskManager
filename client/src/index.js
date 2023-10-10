import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";


export function getFormatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth().toString().padStart(2, 0)
    const day = date.getDate().toString().padStart(2, 0)
    const hour = date.getHours().toString().padStart(2, 0)
    const minute = date.getMinutes().toString().padStart(2, 0)
    const seconds = date.getSeconds().toString().padStart(2, 0)

    return `${day}-${month}-${year}`
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/*<React.StrictMode>*/}
            <App />
        {/*</React.StrictMode>*/}
    </Provider>
);

