import React from 'react';
import _get from 'lodash/get';
import { Box, Typography, Grid } from '@mui/material';
import { bgColor } from 'config/color-const';

export default function ItemProperties({ item, listShowKeys, titleText }) {
    return (
        <Box>
            {titleText && (
                <Typography
                    variant='body1'
                    sx={{
                        fontWeight: '600',
                        fontSize: 17,
                        paddingTop: 4,
                        paddingBottom: 2,
                    }}
                >
                    {titleText}
                </Typography>
            )}

            {item && (
                <Grid container>
                    {listShowKeys.map((key, index) => {
                        const value = _get(item, key.key);
                        return value !== undefined ? (
                            <Grid container key={key.key} sx={{ backgroundColor: index % 2 === 0 ? bgColor : 'transparent' }}>
                                <Grid item xs={6} sx={{ padding: '8px' }}>
                                    <Typography variant='body1' align='left'>
                                        {key.text}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ padding: '8px 0' }}>
                                    <Typography variant='body1' align='left'>
                                        {value}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : null;
                    })}
                </Grid>
            )}
        </Box>
    );
}
