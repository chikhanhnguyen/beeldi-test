import React, { useRef } from 'react';
import { Box, Button, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckpointInfos from './checkpoint-infos';

const CheckpointsBar = ({ checkpoints }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Button onClick={() => scroll('left')} sx={{ minWidth: 'auto' }}>
                <ArrowBackIosIcon />
            </Button>
            <Box
                ref={scrollContainerRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {checkpoints.map((checkpoint, index) => (
                    <Box key={index} sx={{ display: 'flex' }}>
                        <CheckpointInfos checkpoint={checkpoint} />
                        {index < checkpoints.length - 1 && <Divider orientation='vertical' flexItem />}
                    </Box>
                ))}
            </Box>
            <Button onClick={() => scroll('right')} sx={{ minWidth: 'auto' }}>
                <ArrowForwardIosIcon />
            </Button>
        </Box>
    );
};

export default CheckpointsBar;
