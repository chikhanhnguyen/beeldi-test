import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { createBrowserHistory } from 'history'; // problem with latest version, only stable which 4.10.1
import { routerMiddleware } from 'connected-react-router';
import { connectRouter } from 'connected-react-router';
import { rootSaga } from './sagas/root-saga';
import equipmentsReducer from './reducers/equipments-reducer';
import equipmentPageReducer from './reducers/equipment-page-reducer';
import searchReducer from './reducers/search-reducer';

export const history = createBrowserHistory();
const initialState = {};

// ======================================================
// Middleware Configuration
// ======================================================
const sagaMiddleware = createSagaMiddleware();

const appReducer = (history) =>
    combineReducers({
        equipmentPage: equipmentPageReducer,
        equipments: equipmentsReducer,
        search: searchReducer,
        router: connectRouter(history),
    });

const rootReducer = (history) => (state, action) => {
    return appReducer(history)(state, action);
};

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// ======================================================
// Store Enhancers
// ======================================================
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

// ======================================================
// Store Instantiation and HMR Setup
// ======================================================
const store = createStore(rootReducer(history), initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
