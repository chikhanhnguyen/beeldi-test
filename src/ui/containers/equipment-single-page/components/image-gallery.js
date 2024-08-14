import React, { useEffect, useState } from 'react';

import { Box, ImageList, ImageListItem, Dialog, DialogContent, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useScreenSize from 'lib/hooks/useScreenSize';

export default function ImageGallery({ imageData }) {
    const { isMediumScreen } = useScreenSize();
    const singleImage = imageData.length <= 1;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomOpen, setZoomOpen] = useState(false);

    const handleZoomOpen = () => setZoomOpen(true);
    const handleZoomClose = () => setZoomOpen(false);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageData.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imageData.length - 1 ? 0 : prevIndex + 1));
    };

    const handleKeyDown = (event) => {
        if (zoomOpen) {
            if (event.key === 'ArrowLeft') {
                handlePrevImage();
            } else if (event.key === 'ArrowRight') {
                handleNextImage();
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [zoomOpen]);

    const currentImage = imageData[currentImageIndex];

    return (
        <Box style={{ position: 'relative' }}>
            <ImageList variant='masonry' cols={1} gap={8}>
                <ImageListItem key={currentImage.img} onClick={handleZoomOpen} style={{ cursor: 'pointer' }}>
                    <img
                        src={`${currentImage.img}`}
                        srcSet={`${currentImage.img}`}
                        alt={currentImage.title}
                        loading='lazy'
                        style={{
                            padding: singleImage ? 0 : 80,
                            width: isMediumScreen ? '40vw' : '80vw',
                            maxWidth: '700px',
                            minWidth: '350px',
                            height: 'auto',
                            borderRadius: '20px',
                        }}
                    />
                </ImageListItem>
            </ImageList>

            {!singleImage && (
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translateY(-50%)',
                    }}
                >
                    <IconButton onClick={handlePrevImage}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>
            )}
            {!singleImage && (
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: 0,
                        transform: 'translateY(-50%)',
                    }}
                >
                    <IconButton onClick={handleNextImage}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            )}

            {!singleImage && (
                <Box
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        display: 'flex',
                        gap: '8px',
                    }}
                >
                    {imageData.map((item, index) => (
                        <img
                            key={item.img}
                            src={`${item.img}?w=50&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=50&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading='lazy'
                            style={{
                                width: '9vw',
                                maxWidth: '60px',
                                height: 'auto',
                                borderBottom: currentImageIndex === index ? '2px solid black' : 'none',
                                borderRadius: '2px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </Box>
            )}

            <Dialog open={zoomOpen} onClose={handleZoomClose} maxWidth='lg'>
                <DialogContent style={{ position: 'relative' }}>
                    <img
                        src={`${currentImage.img}`}
                        alt={currentImage.title}
                        style={{
                            paddingLeft: 80,
                            paddingRight: 80,
                            width: '80vw',
                            maxWidth: '700px',
                            height: 'auto',
                            minWidth: '40vw',
                        }}
                    />
                    <Box
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <IconButton onClick={handlePrevImage}>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                    <Box
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <IconButton onClick={handleNextImage}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                    <Box
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            left: 10,
                            display: 'flex',
                            gap: '8px',
                        }}
                    >
                        {imageData.map((item, index) => (
                            <img
                                key={item.img}
                                src={`${item.img}`}
                                srcSet={`${item.img}`}
                                alt={item.title}
                                loading='lazy'
                                style={{
                                    width: '8vw',
                                    maxWidth: '65px',
                                    height: 'auto',
                                    borderRadius: '3px',
                                    borderBottom: currentImageIndex === index ? '2px solid black' : 'none',
                                    borderBottomLeftRadius: '2px',
                                    borderBottomRightRadius: '2px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
