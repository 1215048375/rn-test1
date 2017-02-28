import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

const { View, Image, Text } = ReactNative;

export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {currentChannel} = this.props;
        return (
                <View style={{height:60, backgroundColor:'red', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
                    <Image
                        style={{height:40, width:40, marginLeft: 10}}
                        source={require('../imgs/reddit_icon.png')}
                    />
                    <Text style={{fontSize:20, color:"white", marginLeft: 10}}>
                        zhenReddit
                    </Text>
                    <Text style={{fontSize:20, color:"white"}}>
                        {currentChannel ? " | " + currentChannel : ''}
                    </Text>
                </View>
        );
    }
}

AppHeader.propTypes = {
    currentChannel: PropTypes.string
}
