import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history'
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';

const history = createBrowserHistory({basename: process.env.PUBLIC_URL || ''})
const routeMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, routeMiddleware];

const store = createStore(
    combineReducers({
        ...reducers,
        router: connectRouter(history),
    }),
    compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store
