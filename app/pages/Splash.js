import React, {Component} from 'react';
import { Dimensions, Image, InteractionManager } from 'react-native';

import App from '../containers/App';

let {height, width} = Dimensions.get('window');

class Splash extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigator} = this.props;
        setTimeout( () => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: App,
                    name: 'App'
                })
            })
        }, 1);
    }

    render() {
        return (
            <Image
                style={{flex: 1, width: width, height:height}}
                source={require('../imgs/reddit_splash.jpg')}
            />
        )
    };
}

export default Splash;
