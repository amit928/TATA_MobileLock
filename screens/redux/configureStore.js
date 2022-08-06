import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import allInOneReducer from './reducer';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const reducer = combineReducers({
    allInOneReducer
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);

export default configureStore;
