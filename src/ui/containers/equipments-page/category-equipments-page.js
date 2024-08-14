import React, { useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import EquipmentContent from './components/EquipmentContent/equipment-content';
import { APP_SIZE } from 'config/app-const';
import { useListEquipments, useGetEquipments } from '@/redux/selectors/equipments-redux-hook';
import { getIdAtLastOfUrlWithSeparator } from 'util/string-util';
import useScreenSize from 'lib/hooks/useScreenSize';

const styles = {
    container: {
        height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: APP_SIZE.maxWithContentMainPage,
        margin: 'auto',
    },
    header: (isLargeScreen) => ({
        height: isLargeScreen ? 130 : 70,
    }),
    titleBox: (isLargeScreen) => ({
        width: '100%',
        height: isLargeScreen ? '200px' : '100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    title: (isLargeScreen) => ({
        fontSize: isLargeScreen ? 70 : 30,
        fontWeight: '700',
        position: 'absolute',
        color: 'black',
        backgroundColor: 'transparent',
    }),
};

export default function CategoryEquipmentsPage({ match }) {
    const { isLargeScreen } = useScreenSize();
    const listEquipments = useListEquipments();
    const getEquipments = useGetEquipments();

    useEffect(() => {
        if (!listEquipments.equipments.length && !listEquipments.isEnd) {
            getEquipments(1);
        }
    }, [listEquipments.equipments.length, listEquipments.isEnd, getEquipments]);

    const fetchMoreData = useCallback(() => {
        if (listEquipments.isEnd) return;

        const newPage = listEquipments.page + 1;
        getEquipments(newPage);
    }, [listEquipments.isEnd, listEquipments.page, getEquipments]);

    const categoryIdFromUrl = parseInt(getIdAtLastOfUrlWithSeparator(match.params.handle));
    const categoryText = 'Équipements';

    return (
        <Box>
            <Box sx={styles.header(isLargeScreen)} />
            <Box sx={styles.titleBox(isLargeScreen)}>
                <Typography variant='h6' sx={styles.title(isLargeScreen)}>
                    {categoryText}
                </Typography>
            </Box>
            {categoryIdFromUrl === 1 && listEquipments.equipments.length > 0 && (
                <Box sx={styles.container}>
                    <EquipmentContent fetchMoreData={fetchMoreData} equipments={listEquipments.equipments} isEnd={listEquipments.isEnd} />
                </Box>
            )}
        </Box>
    );
}
