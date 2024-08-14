import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getLinkFromCategory } from 'util/string-util';
import { colorDivider } from 'config/color-const';

const CategoryNavigationItem = ({ label, to = '/', showArrowIcon = true }) => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' color={colorDivider}>
            <Typography
                component={to ? Link : 'span'}
                to={to || null}
                color={colorDivider}
                fontSize='0.75rem'
                sx={{
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: !!to ? 'underline' : 'none',
                    },
                }}
            >
                {label}
            </Typography>

            {showArrowIcon && <Box marginX={0.5}>{'›'}</Box>}
        </Box>
    );
};

export default function CategoryNavigation({ equipment }) {
    const pathGroup = [
        {
            id: 1,
            parent_id: null,
            name: 'Équipements',
            normalized_name: 'equipements',
        },
        {
            id: 0,
            parent_id: null,
            name: equipment.name,
            normalized_name: equipment.name,
        },
    ];

    return (
        <Box display='flex' marginTop={1}>
            {pathGroup.map((elm, idx) => (
                <CategoryNavigationItem
                    key={`${elm.id}-${idx}`}
                    label={elm.name}
                    to={elm.id > 0 ? getLinkFromCategory(elm) : null}
                    showArrowIcon={idx !== pathGroup.length - 1}
                />
            ))}
        </Box>
    );
}
