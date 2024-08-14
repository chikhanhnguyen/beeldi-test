import React from 'react';
import { Box, Typography, CardMedia, Button } from '@mui/material';
import { APP_SIZE } from 'config/app-const';
import useScreenSize from 'lib/hooks/useScreenSize';
import { Link } from 'react-router-dom';
import { getLinkFromCategory } from 'util/string-util';

export default function BandBar() {
    const { isLargeScreen } = useScreenSize();

    // Common styles
    const commonTextStyles = {
        fontWeight: '700',
        color: 'white',
        backgroundColor: 'transparent',
        padding: 0,
    };

    const imageHeight = isLargeScreen ? '760px' : '400px';
    const textSize = isLargeScreen ? 45 : 30;
    const buttonSize = isLargeScreen ? 16 : 15;
    const topPosition = isLargeScreen ? '60%' : '50%';
    const barHeight = isLargeScreen ? 130 : 70;

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                padding: 0,
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    height: barHeight,
                    position: 'absolute',
                }}
            ></Box>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: APP_SIZE.maxWithContentMainPage,
                    margin: 'auto',
                    position: 'absolute',
                    top: topPosition,
                    zIndex: 1,
                    paddingLeft: 1,
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        ...commonTextStyles,
                        fontSize: textSize,
                        padding: '10px 0px',
                    }}
                >
                    Gérez vos équipements
                </Typography>
                <Button
                    variant='contained'
                    component={Link}
                    to={getLinkFromCategory({ id: 1, normalized_name: 'equipments' })}
                    sx={{
                        width: '160px',
                        height: '60px',
                        padding: 0,
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            ...commonTextStyles,
                            fontSize: buttonSize,
                            padding: '0px',
                        }}
                    >
                        Voir plus
                    </Typography>
                </Button>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: imageHeight,
                    overflow: 'hidden',
                    position: 'relative',
                    padding: '0px',
                    margin: '0px',
                }}
            >
                <CardMedia
                    component='img'
                    src='/main_image.png'
                    alt='Banner'
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: imageHeight,
                        objectFit: 'cover',
                        filter: 'brightness(80%)',
                    }}
                />
            </Box>
        </Box>
    );
}
