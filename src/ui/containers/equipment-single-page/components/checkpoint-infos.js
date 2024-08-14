import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CheckpointInfos({ checkpoint }) {
    const renderInfoSection = (label, value) => (
        <Box paddingBottom={2}>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: '600' }}
            >
                {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {value}
            </Typography>
        </Box>
    );

    return (
        <Box
            sx={{
                width: '300px',
                padding: 2,
                textAlign: 'left',
            }}
        >
            {checkpoint.name && renderInfoSection('Nom', checkpoint.name)}
            {checkpoint.fault && renderInfoSection('Défaut', checkpoint.fault)}
            {checkpoint.recommandation && renderInfoSection('Recommandation', checkpoint.recommandation)}
            {checkpoint.photo && (
                <Box
                    component="img"
                    src={checkpoint.photo}
                    alt={checkpoint.name || 'Checkpoint photo'}
                    loading="lazy"
                    sx={{
                        marginTop: 2,
                        borderRadius: '10%',
                        width: '150px',
                        height: 'auto',
                    }}
                />
            )}
        </Box>
    );
}
