import React from 'react'
import { View, Text, Button } from 'react-native'

import App from './App'


export default class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressBtn() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'App',
                component: App,
                params: {
                    test: 'nodejs'
                }
            })
        }
    }

    render() {
        return (
            <View>
                <Text>i'm page2</Text>
                <Button onPress={this._pressBtn.bind(this)} title="clickme" />
            </View>
        )
    }
}