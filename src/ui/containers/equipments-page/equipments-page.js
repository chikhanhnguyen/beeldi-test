import React, { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import BandBar from 'ui/components/band-bar';
import EquipmentContent from './components/EquipmentContent/equipment-content';
import { APP_SIZE } from 'config/app-const';
import { useListEquipments, useGetEquipments } from '@/redux/selectors/equipments-redux-hook';
import useScreenSize from 'lib/hooks/useScreenSize';

const styles = {
    header: (isLargeScreen) => ({
        height: isLargeScreen ? 130 : 70,
    }),
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: APP_SIZE.maxWithContentMainPage,
        margin: 'auto',
    },
};

export default function EquipmentsPage() {
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
        getEquipments(listEquipments.page + 1);
    }, [listEquipments.isEnd, listEquipments.page, getEquipments]);

    return (
        <Box>
            <Box sx={styles.header(isLargeScreen)} />
            <BandBar />
            <Box sx={styles.container}>
                <EquipmentContent fetchMoreData={fetchMoreData} equipments={listEquipments.equipments} isEnd={listEquipments.isEnd} />
            </Box>
        </Box>
    );
}
