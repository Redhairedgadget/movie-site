import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';
import movieReducer from './store/reducers/movies';
import authReducer from './store/reducers/auth';
import profileReducer from './store/reducers/profile';

const rootReducer = combineReducers({
    movieReducer,
    authReducer,
    profileReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));


