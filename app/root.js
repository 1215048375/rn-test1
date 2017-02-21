import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux';
import App from './containers/App'
import confStore from './store'

const store = confStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}
