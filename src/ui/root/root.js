// Redux
import { Provider } from 'react-redux';
import store from '@/redux/store';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import appHttpInterceptor from '@/redux/sagas/interceptor';

import themeObject from './theme';

const theme = createTheme(themeObject);

function Root(props) {
    const { routes } = props;
    appHttpInterceptor(store);
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                {routes}
            </Provider>
        </ThemeProvider>
    );
}

export default Root;
