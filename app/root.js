import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import Index from './containers/Index';
import confStore from './store';

const store = confStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}
