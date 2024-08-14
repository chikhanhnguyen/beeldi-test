import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { isProd } from 'config/env-config';

// replace console.* for disable log on production
if (isProd) {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
}

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
