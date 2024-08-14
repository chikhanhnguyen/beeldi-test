import { fourthColor, primaryColor, secondaryColor } from 'config/color-const';

export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: primaryColor,
            dark: primaryColor,
            contrastText: '#fff',
        },
        secondary: {
            light: secondaryColor,
            main: secondaryColor,
            dark: secondaryColor,
            contrastText: '#fff',
        },
        text: {
            secondary: fourthColor,
        },
    },
    layout: {
        drawerWidth: 220,
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        useNextVariants: true,
        fontSize: 15,
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                enterDelay: 300,
                PopperProps: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -10],
                            },
                        },
                    ],
                },
            },
            styleOverrides: {
                tooltip: {
                    borderRadius: 5,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: 50,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                        boxShadow: 'none',
                        opacity: 0.9,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: primaryColor,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        opacity: 0.9,
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
                paper: {
                    borderRadius: 15,
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                listbox: {
                    '& li': {
                        borderRadius: 8,
                        margin: '0',
                        padding: '0 -5px',
                    },
                    margin: 0,
                    padding: 0,
                },
                root: {
                    '& .MuiAutocomplete-listbox': {
                        color: 'green',
                    },
                },
                inputRoot: {
                    boxShadow: 'none',
                    backgroundColor: '#f0f2f5',
                },
            },
        },
        // MuiToolbar: {
        //     styleOverrides: {
        //         regular: {
        //             maxHeight: '60px',
        //             minHeight: '54px',
        //             marginLeft: 'auto',
        //             marginRight: 'auto',
        //             // don't remove this code, it's used for overriding the default behavior
        //             '@media (min-width: 600px)': {
        //                 maxHeight: '60px',
        //                 minHeight: '54px',
        //                 marginLeft: 'auto',
        //                 marginRight: 'auto',
        //             },
        //         },
        //     },
        // },
    },
};
