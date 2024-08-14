import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { useFilters, useSetFilters } from '@/redux/selectors/search-redux-hook';
import useScreenSize from 'lib/hooks/useScreenSize';

export default function FilterBar({ bigSize }) {
    const { isMobileScreen } = useScreenSize();
    const filters = useFilters();
    const setFilters = useSetFilters();

    const listFilters = [
        { key: 'name', text: 'Nom' },
        { key: 'brand', text: 'Marque' },
        { key: 'domain', text: 'Domaine' },
        { key: 'building', text: 'Bâtiment' },
    ];

    const allFilter = {
        key: 'all',
        text: bigSize && !isMobileScreen ? 'Tous les filtres' : 'Tous',
    };

    const isAllFilterSelected = filters.length === listFilters.length;
    const containerDirection = !bigSize && isMobileScreen ? 'column' : 'row';

    const handleFilterClick = (selectedFilter) => {
        if (selectedFilter.key === allFilter.key) {
            setFilters(isAllFilterSelected ? [listFilters[0].key] : listFilters.map(item => item.key));
        } else {
            const newFilters = filters.includes(selectedFilter.key)
                ? filters.filter(item => item !== selectedFilter.key)
                : [...filters, selectedFilter.key];
            setFilters(newFilters);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection={containerDirection}
            alignItems="center"
            justifyContent="center"
            sx={{ gap: 1 }}
        >
            <Button
                size="small"
                variant={isAllFilterSelected ? 'contained' : 'outlined'}
                color={isAllFilterSelected ? 'primary' : 'inherit'}
                onClick={() => handleFilterClick(allFilter)}
                sx={{ marginBottom: !bigSize && isMobileScreen ? 1 : 0 }}
            >
                {allFilter.text}
            </Button>
            <ButtonGroup variant="text" size="small" aria-label="text filter button group">
                {listFilters.map((filter) => (
                    <Button
                        key={filter.key}
                        variant={filters.includes(filter.key) ? 'contained' : 'outlined'}
                        color={filters.includes(filter.key) ? 'primary' : 'inherit'}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter.text}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
}
