import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers'
import createLogger from 'redux-logger';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initState) {
    return createStoreWithMiddleware(reducer, initState)
}


