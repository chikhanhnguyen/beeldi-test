import React from 'react';

import Divider from '@mui/material/Divider';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ItemProperties from './item-properties';

export default function EquipmentCharacteristic({ equipment }) {
    return (
        <Box>
            <Box paddingBottom={5}>
                <ItemProperties
                    item={equipment}
                    listShowKeys={[
                        {
                            key: 'model',
                            text: 'Modèle',
                        },
                        {
                            key: 'serialNumber',
                            text: 'Numéro de série',
                        },
                        {
                            key: 'quantity',
                            text: 'Quantité',
                        },
                        {
                            key: 'nbFaults',
                            text: 'Nombre de défauts',
                        },
                        {
                            key: 'status',
                            text: 'Statut',
                        },
                    ]}
                    titleText={'Caractéristiques'}
                />
            </Box>
            <Divider />
            {!!equipment.notes && (
                <>
                    <Accordion
                        sx={{
                            boxShadow: 'none',
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                            sx={{
                                padding: 0,
                            }}
                        >
                            <Typography
                                variant='body1'
                                sx={{
                                    fontWeight: '600',
                                    fontSize: 17,
                                }}
                            >
                                Notes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                variant='body1'
                                sx={{
                                    fontWeight: '400',
                                    fontSize: 17,
                                }}
                            >
                                {equipment.notes}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                </>
            )}
        </Box>
    );
}
