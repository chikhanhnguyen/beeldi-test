import makeStyles from '@mui/styles/makeStyles';
import { APP_SIZE } from 'config/app-const';

const useStyle = makeStyles({
    appBarMain: {
        '& .MuiAppBar-root': {
            position: 'fixed',
            transition: 'top 0.4s ease-in-out',
            boxShadow: 'none',
            backdropFilter: 'blur(10px)',
            webkitBackdropFilter: 'blur(10px)',
        },
        '& .MuiToolbar-root': {
            display: 'flex',
            padding: 0,
            margin: '0 16px',
        },
    },
    appBar: {
        '& .MuiAppBar-root': {
            position: 'fixed',
            boxShadow: 'none',
            backdropFilter: 'blur(10px)',
            webkitBackdropFilter: 'blur(10px)',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            '@media (min-width: 575px)': {
                maxWidth: APP_SIZE.maxWithContentMainPage,
            },
            zIndex: 0,
        },
        '& .MuiToolbar-root': {
            padding: 0,
        },
    },
    logoWithTextIcon: {
        height: 50,
    },
});

export default useStyle;
