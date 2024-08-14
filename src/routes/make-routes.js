// @ts-nocheck
import React from 'react';

import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/store';
import { RAW_ROUTERS } from './url-routes';

// Main bar
import NavigatorBar from 'ui/containers/navigator/navigator-bar';

// Pages
import EquipmentsPage from 'ui/containers/equipments-page/equipments-page';
import CategoryEquipmentsPage from 'ui/containers/equipments-page/category-equipments-page';
import EquipmentSinglePage from 'ui/containers/equipment-single-page/equipment-single-page';
import SearchEquipmentsPage from 'ui/containers/equipments-page/search-equipments-page';

/**
 * Build routes
 *
 * @returns {Element}
 */
const makeRoutes = () => {
    return (
        <ConnectedRouter history={history}>
            <div className='main'>
                <NavigatorBar />
                <div className='container'>
                    <Route exact path={RAW_ROUTERS.ROOT} component={EquipmentsPage} />
                    <Route exact path={RAW_ROUTERS.ALL_EQUIPMENT} component={EquipmentsPage} />
                    <Route exact path={RAW_ROUTERS.CATEGORY} component={CategoryEquipmentsPage} />
                    <Route exact path={RAW_ROUTERS.EQUIPMENT_SINGLE_PAGE} component={EquipmentSinglePage} />
                    <Route exact path={RAW_ROUTERS.SEARCH} component={SearchEquipmentsPage} />
                </div>
            </div>
        </ConnectedRouter>
    );
};

export default makeRoutes;
