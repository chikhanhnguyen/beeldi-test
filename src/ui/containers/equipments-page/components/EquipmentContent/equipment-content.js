import React from 'react';

import Grid from '@mui/material/Grid';
import EquipmentCard from './equipment-card';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function EquipmentContent({ fetchMoreData, equipments, isEnd }) {
    //
    return (
        <InfiniteScroll
            style={{ backgroundColor: 'transparent', overflow: 'hidden' }}
            dataLength={equipments.length}
            hasMore={true}
            next={fetchMoreData}
            loader=''
        >
            <Grid container rowSpacing={7} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
                {equipments.map((equipment) => (
                    <Grid
                        item
                        xs={2}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                        key={equipment.key}
                        sx={{
                            display: 'flex',
                            // alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <EquipmentCard equipment={equipment} />
                    </Grid>
                ))}
            </Grid>
        </InfiniteScroll>
    );
}
