import makeStyles from '@mui/styles/makeStyles';

const useStyle = makeStyles({
    appBar: {
        '& .MuiAppBar-root': {
            position: 'fixed',
            boxShadow: 'none',
            backgroundColor: 'RGBA(240,240,240,0.88)',
            backdropFilter: 'blur(10px)',
            webkitBackdropFilter: 'blur(10px)',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            '@media (min-width: 575px)': {
                // maxWidth: APP_SIZE.maxWithContentMainPage,
            },
            zIndex: 1300,
        },
        '& .MuiToolbar-root': {
            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
    },
});

export default useStyle;
