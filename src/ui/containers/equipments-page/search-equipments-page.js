import React, { useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

import EquipmentContent from './components/EquipmentContent/equipment-content';
import FilterBar from '../../components/filter-bar';
import { APP_SIZE } from 'config/app-const';
import { useListSearchEquipments, useGetSearchEquipments } from '@/redux/selectors/equipments-redux-hook';
import { useSetQuery } from '@/redux/selectors/search-redux-hook';
import useScreenSize from 'lib/hooks/useScreenSize';

const styles = {
    header: (isLargeScreen) => ({
        height: isLargeScreen ? 150 : 90,
    }),
    titleBox: (isLargeScreen) => ({
        width: '100%',
        height: isLargeScreen ? '100px' : '50px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
    }),
    title: (isLargeScreen) => ({
        fontSize: isLargeScreen ? 30 : 20,
        fontWeight: '700',
        position: 'absolute',
        color: 'black',
        backgroundColor: 'transparent',
    }),
    contentContainer: {
        paddingTop: 5,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: APP_SIZE.maxWithContentMainPage,
        margin: 'auto',
        minHeight: '100%',
    },
};

export default function SearchEquipmentsPage({ location }) {
    const { isLargeScreen } = useScreenSize();
    const rawQuery = location.search.slice(7);

    const listSearchEquipments = useListSearchEquipments();
    const getSearchEquipments = useGetSearchEquipments();
    const setQuery = useSetQuery();

    useEffect(() => {
        if (!listSearchEquipments.equipments.length && !listSearchEquipments.isEnd) {
            setQuery(rawQuery);
            getSearchEquipments(rawQuery, 1);
        }
    }, [listSearchEquipments.equipments.length, listSearchEquipments.isEnd, rawQuery, getSearchEquipments, setQuery]);

    const fetchMoreData = useCallback(() => {
        if (!listSearchEquipments.isEnd) {
            getSearchEquipments(rawQuery, listSearchEquipments.page + 1);
        }
    }, [listSearchEquipments.isEnd, listSearchEquipments.page, getSearchEquipments, rawQuery]);

    return (
        <Box>
            <Box sx={styles.header(isLargeScreen)} />
            <FilterBar bigSize={true} />
            <Box sx={styles.titleBox(isLargeScreen)}>
                <Typography variant='h6' sx={styles.title(isLargeScreen)}>
                    {listSearchEquipments.count} résultats trouvés pour "{rawQuery}"
                </Typography>
            </Box>
            {listSearchEquipments.equipments.length > 0 && (
                <Box sx={styles.contentContainer}>
                    <EquipmentContent fetchMoreData={fetchMoreData} equipments={listSearchEquipments.equipments} isEnd={listSearchEquipments.isEnd} />
                </Box>
            )}
        </Box>
    );
}
