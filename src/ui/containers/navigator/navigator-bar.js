import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { AppBar as MuiAppBar, Box, Toolbar, TextField, IconButton, InputAdornment, Collapse, Avatar, Paper, Typography, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';

import { RAW_ROUTERS } from 'routes/url-routes';
import { checkWindowPathInclude } from 'lib/hooks/check-window-path';
import useStyle from 'ui/containers/navigator/navigator-style';
import useDebounce from 'lib/hooks/useDebounce';
import useScreenSize from 'lib/hooks/useScreenSize';
import { APP_SIZE } from 'config/app-const';
import { CONST_VAR } from 'config/app-config';

import { useQuery, useSetQuery, useFilters } from '@/redux/selectors/search-redux-hook';
import { useListSearchEquipments, useGetSearchEquipments } from '@/redux/selectors/equipments-redux-hook';

import FilterBar from '../../components/filter-bar';
import { getLinkFromEquipment } from 'util/string-util';

export default function NavigatorBar() {
    const classes = useStyle();
    const history = useHistory();

    const { isLargeScreen, isMobileScreen } = useScreenSize();

    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [showCenter, setShowCenter] = useState(false);

    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const paperRef = useRef(null);

    const query = useQuery();
    const filters = useFilters();

    // dispatch
    const setQuery = useSetQuery();
    const getSearchEquipments = useGetSearchEquipments();

    // state
    const listSearchEquipments = useListSearchEquipments();

    const isSearchPage = checkWindowPathInclude(RAW_ROUTERS.SEARCH);

    // Debounced search
    useDebounce(
        () => {
            getSearchEquipments(query, 1);
        },
        500,
        [query]
    );

    useEffect(() => {
        if (!isSearchPage) {
            setQuery('');
        }
    }, [isSearchPage]);

    useEffect(() => {
        getSearchEquipments(query, 1);
    }, [filters]);

    useEffect(() => {
        const handleCloseSearch = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target) && paperRef.current && !paperRef.current.contains(event.target)) {
                if (query === '') {
                    setExpanded(false);
                }
                setOpen(false);
                setFocused(false);
            }
        };

        document.addEventListener('mousedown', handleCloseSearch);
        return () => {
            document.removeEventListener('mousedown', handleCloseSearch);
        };
    }, [query]);

    useEffect(() => {
        if (expanded) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
        setShowCenter(isMobileScreen && expanded);
    }, [expanded, isMobileScreen]);

    const handleExpandClick = () => {
        setExpanded(true);
        setOpen(true);
        setFocused(true);
    };

    const onClickCapture = (e) => {
        if (e.target.value !== undefined && e.target.value !== query) {
            setQuery(e.target.value);
        }
    };

    const inputChange = (_event, value, reason) => {
        if (reason === 'input' || reason === 'clear') {
            setQuery(value ?? '');
        }
    };

    const optionLabel = (option) => (typeof option === 'string' ? option : option.name);

    const options = useCallback(() => {
        if (!query) return [];
        return listSearchEquipments.equipments.slice(0, CONST_VAR.SIZE_SEARCH_SHOW);
    }, [listSearchEquipments, query]);

    const filterOptions = (options) => {
        if (options.length === 0) {
            return [{ key: '', name: '', photo: '' }]; // a fake option
        }
        return options;
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClickItem = () => {
        setOpen(false);
        setFocused(false);
    };

    const renderInput = (params) => (
        <TextField
            {...params}
            inputRef={inputRef}
            placeholder='Recherche ...'
            variant='outlined'
            size='small'
            onFocus={() => {
                setFocused(true);
                getSearchEquipments(query, 1);
            }}
            onBlur={() => !open && setFocused(false)}
            onKeyDown={(e) => {
                if (['Enter', 'NumpadEnter'].includes(e.code)) {
                    handleClickItem();
                    history.push(`${RAW_ROUTERS.SEARCH}?query=${query}`);
                }
            }}
            InputProps={{
                ...params.InputProps,
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                ),
                style: {
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: focused ? '2px solid' : 'none',
                },
            }}
            sx={{
                backgroundColor: 'white',
                borderRadius: '6px',
                width: '40vw',
                minWidth: '350px',
                maxWidth: '600px',
                margin: '0px',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        border: focused ? '2px' : 'none',
                    },
                },
            }}
        />
    );

    const CustomPaper = (props) => {
        return (
            <Paper {...props} ref={paperRef}>
                <Box textAlign='center' padding={1} sx={{ cursor: 'pointer' }}>
                    <FilterBar bigSize={false} />
                </Box>
                {props.children}
                {query.trim() && (
                    <>
                        <Divider />
                        <Box textAlign='center' padding={1} sx={{ cursor: 'pointer' }}>
                            <Link to={`${RAW_ROUTERS.SEARCH}?query=${query}`} style={{ textDecoration: 'none' }} onClick={handleClickItem}>
                                <Typography variant='body2' color='primary' fontWeight={600}>
                                    Voir tous les résultats
                                </Typography>
                            </Link>
                        </Box>
                    </>
                )}
            </Paper>
        );
    };

    return (
        <div className={classes.appBar}>
            <MuiAppBar
                sx={{
                    height: isLargeScreen ? 130 : 70,
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: APP_SIZE.maxWithContentMainPage,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {!showCenter && (
                            <Box margin={0}>
                                <IconButton aria-label='icon-app' size='small' component={Link} to={RAW_ROUTERS.ROOT}>
                                    <img src='/chat.png' height={isLargeScreen ? 80 : 50} alt='Logo' />
                                </IconButton>
                            </Box>
                        )}

                        <Box
                            marginLeft={showCenter ? 'auto' : 0}
                            marginRight={showCenter ? 'auto' : 1}
                            display='flex'
                            alignItems='center'
                            justifyContent={showCenter ? 'center' : 'flex-start'}
                        >
                            <Collapse in={expanded} timeout='auto' orientation='horizontal' ref={searchRef}>
                                <Autocomplete
                                    open={open}
                                    onOpen={handleOpen}
                                    inputValue={query}
                                    options={options()}
                                    onClickCapture={onClickCapture}
                                    getOptionLabel={optionLabel}
                                    renderOption={(props, option) =>
                                        option.name ? (
                                            <Box
                                                key={option.key}
                                                component={Link}
                                                to={getLinkFromEquipment(option)}
                                                onClick={handleClickItem}
                                                sx={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                <Box component='li' {...props} display='flex' alignItems='center'>
                                                    <Avatar src={option.photo} alt={option.name} sx={{ marginRight: 2 }} />
                                                    {option.name}
                                                </Box>
                                            </Box>
                                        ) : null
                                    }
                                    autoHighlight
                                    freeSolo
                                    id='search-auto-complete'
                                    selectOnFocus
                                    filterOptions={filterOptions}
                                    onInputChange={inputChange}
                                    renderInput={renderInput}
                                    sx={{ width: '40vw', minWidth: '350px', maxWidth: '600px', margin: 0 }}
                                    PaperComponent={CustomPaper}
                                />
                            </Collapse>
                            {!expanded && (
                                <IconButton onClick={handleExpandClick}>
                                    <SearchIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </div>
    );
}
