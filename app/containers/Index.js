import React from 'react';
import ReactNative from 'react-native';
import Splash from '../pages/Splash'

import { NaviGoBack } from '../utils/Tools'

const { Navigator, StatusBar, View } = ReactNative;


export default class Index extends React.Component {
    constructor(props) {
        super(props);

    }

    _confScene(route) {
        return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
    }

    _renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return <Component {...route.params} navigator={navigator} />
    }

    _goBack() {
        return NaviGoBack(_navigator);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="default"
                />
                <Navigator
                    initialRoute={{name: "Splash", component: Splash}}
                    configureScene={this._confScene}
                    renderScene={this._renderScene}
                />
            </View>
        );
    }
}

