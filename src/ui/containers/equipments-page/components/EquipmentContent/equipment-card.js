import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useScreenSize from 'lib/hooks/useScreenSize';
import { getLinkFromEquipment } from 'util/string-util';
import { thirdColor } from 'config/color-const';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const styles = {
    card: {
        width: '100%',
        boxShadow: 'none',
        borderRadius: 2,
        textDecoration: 'none',
        '@media (min-width: 1000px)': {
            width: 'calc(100% - 16px)',
        },
        '@media (max-width: 1000px)': {
            width: 'calc(100% - 16px)',
        },
    },
    media: {
        width: '100%',
        height: 'auto',
        aspectRatio: '3 / 2',
    },
    cardActions: {
        padding: '20px',
    },
    cardActionsCollapsed: {
        padding: '0px 20px 20px 20px',
    },
    cardContent: {
        padding: '0px',
    },
    contentText: {
        fontWeight: '300',
    },
    domainText: {
        fontWeight: '500',
        color: thirdColor,
    },
    collapseContent: {
        padding: '5px 20px',
    },
};

export default function EquipmentCard({ equipment }) {
    const [expanded, setExpanded] = useState(false);
    const { isLargeScreen } = useScreenSize();

    const handleExpandClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setExpanded(!expanded);
    };

    return (
        <Card component={Link} to={getLinkFromEquipment(equipment)} sx={styles.card}>
            <CardMedia component='img' sx={styles.media} image={equipment.photo} alt='Equipment' />
            <CardActions disableSpacing sx={styles.cardActions}>
                <CardContent sx={styles.cardContent}>
                    <Typography
                        variant='body2'
                        color='text.primary'
                        sx={{
                            fontSize: isLargeScreen ? 30 : 20,
                            ...styles.contentText,
                        }}
                    >
                        {equipment.name}
                    </Typography>
                </CardContent>
            </CardActions>
            <CardActions disableSpacing sx={styles.cardActionsCollapsed}>
                <CardContent sx={styles.cardContent}>
                    {equipment.domain && (
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                fontSize: isLargeScreen ? 15 : 12,
                            }}
                        >
                            Domaine <span style={styles.domainText}>{equipment.domain}</span>
                        </Typography>
                    )}
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                            fontSize: isLargeScreen ? 15 : 12,
                        }}
                    >
                        Nombre de défauts <span style={styles.domainText}>{equipment.nbFaults}</span>
                    </Typography>
                </CardContent>
                {(equipment.brand || equipment.building) && (
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='Afficher plus'>
                        <ExpandMoreIcon />
                    </ExpandMore>
                )}
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent sx={styles.collapseContent}>
                    {equipment.brand && (
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                fontSize: isLargeScreen ? 15 : 12,
                            }}
                        >
                            Marque <span style={styles.domainText}>{equipment.brand}</span>
                        </Typography>
                    )}
                    {equipment.building && (
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                fontSize: isLargeScreen ? 15 : 12,
                            }}
                        >
                            Bâtiment <span style={styles.domainText}>{equipment.building}</span>
                        </Typography>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}
