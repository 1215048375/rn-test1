import React from 'react';
import ReactNative from 'react-native';

const { View, Image, Text } = ReactNative;

export default class AppHeader extends React.Component {
    render() {
        return (
            <View style={{height:60, backgroundColor:'red', flexDirection: 'column', justifyContent: 'center'}}>
                <View style={{height:40, backgroundColor:'red', flexDirection: 'row', justifyContent: 'flex-start'}} >
                    <Image
                        style={{height:40, width:40}}
                        source={require('../imgs/reddit_icon.png')}
                    />
                    <Text style={{fontSize:20, color:"white"}}>
                        zhenReddit
                    </Text>
                </View>
            </View>
        );
    }
}
