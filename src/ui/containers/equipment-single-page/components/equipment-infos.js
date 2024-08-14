import React from 'react';

import Box from '@mui/material/Box';
import ItemProperties from './item-properties';

export default function EquipmentInfos({ equipment }) {
    return (
        <Box>
            <ItemProperties
                item={equipment}
                listShowKeys={[
                    {
                        key: 'brand',
                        text: 'Marque',
                    },
                    {
                        key: 'domain',
                        text: 'Domaine',
                    },
                    {
                        key: 'local',
                        text: 'Local',
                    },
                    {
                        key: 'building',
                        text: 'Bâtiment',
                    },
                    {
                        key: 'niveau',
                        text: 'Niveau',
                    },
                ]}
                titleText={'Infos'}
            />
        </Box>
    );
}
