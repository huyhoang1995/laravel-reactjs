import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import createSagaMiddleware from "redux-saga";
import AllReducer from "../reducers/AllReducer";
import RouterComponent from "./RouterComponent";
import RootSaga from "../sagas/RootSaga";
const sagaMiddleware = createSagaMiddleware();
let store = createStore(AllReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

export default class RootComponent extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterComponent></RouterComponent>
            </Provider>
        );
    }
}

if (document.getElementById('RootComponent')) {
    ReactDOM.render(<RootComponent />, document.getElementById('RootComponent'));
}
