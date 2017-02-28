import React from 'react';
import ReactNative from 'react-native';

import AppHeader from '../components/AppHeader';

import { NaviGoBack } from '../utils/Tools'

const {
    WebView,
    View,
    Text,
    BackAndroid
} = ReactNative;

export default class WebPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url : 'default'};
        this._navBack = this._navBack.bind(this);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._navBack);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._navBack);
    }

    _navBack() {
        return NaviGoBack(this.props.navigator);
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader/>

                { this.props.url.length > 0 &&
                    <WebView
                        style={{flex:1}}
                        source={{uri: this.props.url}}
                        scalesPageToFit={true}
                        ref='webview'
                        automaticallyAdjustContentInsets={false}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        decelerationRate="normal"
                    />
                }
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column'
    }
}
