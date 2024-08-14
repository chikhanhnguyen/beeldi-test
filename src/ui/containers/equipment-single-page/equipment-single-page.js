import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import useScreenSize from 'lib/hooks/useScreenSize';
import { APP_SIZE } from 'config/app-const';
import { getIdAtLastOfUrlWithSeparator } from 'util/string-util';

import { getEquipmentById } from '@/redux/actions/equipment-page-actions';
import { equipmentSelector } from '@/redux/selectors/equipment-page-selector';

import { Box, Grid, Paper, Typography } from '@mui/material';
import CategoryNavigation from 'ui/components/category-navigation';
import ImageGallery from './components/image-gallery';
import EquipmentInfos from './components/equipment-infos';
import EquipmentCharacteristic from './components/equipment-characteristic';
import CheckpointsBar from './components/checkpoints-bar';

const styles = {
    container: {
        backgroundColor: 'white',
        paddingBottom: 10,
    },
    content: {
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: APP_SIZE.maxWithContentMainPage,
        margin: 'auto',
    },
    spacing: {
        large: 130,
        small: 70,
    },
    title: {
        fontWeight: '800',
        fontSize: 40,
        paddingBottom: 2,
    },
    paper: {
        padding: '20px',
        boxShadow: 'none',
    },
    checkpointsTitle: {
        fontWeight: '600',
        fontSize: 17,
        paddingTop: 4,
        paddingBottom: 2,
    }
};

const EquipmentSinglePage = ({ match, equipment, getEquipmentById }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isLargeScreen } = useScreenSize();
    const equipmentIdFromUrl = getIdAtLastOfUrlWithSeparator(match.params.handle);

    useEffect(() => {
        if (!equipment.key || equipment.key !== equipmentIdFromUrl) {
            getEquipmentById(equipmentIdFromUrl);
        }
    }, [equipmentIdFromUrl, equipment.key, getEquipmentById]);

    const photo_urls = equipment.photo ? [equipment.photo] : [];
    const list_img_urls = photo_urls.map((photo, index) => ({
        img: photo,
        title: `${equipment.key}-${index}`,
    }));

    return (
        <Box sx={styles.container}>
            <Box sx={styles.content}>
                <Box sx={{ height: isLargeScreen ? styles.spacing.large : styles.spacing.small }} />
                <CategoryNavigation equipment={equipment} />
                <Box sx={{ height: isLargeScreen ? 30 : 20 }} />
                <Typography variant='body1' sx={styles.title}>
                    {equipment.name}
                </Typography>
                <Grid container columnSpacing={7} columns={12}>
                    <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper elevation={3} sx={styles.paper}>
                            {!!equipment.photo && <ImageGallery imageData={list_img_urls} />}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box display='flex' flexDirection='column' gap={0.5}>
                            <EquipmentInfos equipment={equipment} />
                            <EquipmentCharacteristic equipment={equipment} />
                        </Box>
                    </Grid>
                </Grid>
                {!!equipment?.checkpoints?.length && (
                    <Box paddingTop={5}>
                        <Typography variant='body1' sx={styles.checkpointsTitle}>
                            Points de contrôle
                        </Typography>
                        <CheckpointsBar checkpoints={equipment.checkpoints} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    equipment: equipmentSelector(state),
});

export default connect(mapStateToProps, {
    getEquipmentById,
})(EquipmentSinglePage);
