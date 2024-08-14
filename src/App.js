import './App.css';

import Root from 'ui/root/root';
import makeRoutes from 'routes/make-routes';
import axios from 'axios';
import React from 'react';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

ReactGA.initialize([{ debug: true }]);
axios.defaults.withCredentials = true;

const routes = makeRoutes();

const helmetContext = {};

function App() {
    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: window.location.pathname + window.location.search,
            title: '',
        });
    }, []);
    return (
        <HelmetProvider context={helmetContext}>
            <Root routes={routes} />
        </HelmetProvider>
    );
}

export default App;
