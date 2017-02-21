import React, { Component, PropTypes } from 'react'
import { View, Text, Button, Alert, ListView } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    data: {title: "1"}
                },
                {
                    data: {title: "2"}
                },
            ]),
        };

        // this.onPressEvent = this.onPressEvent.bind(this);
    }

    componentDidMount() {
        const { dispatch, currentChannel } = this.props;
        dispatch(actions.fetchPosts(currentChannel));
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props');
        console.log(nextProps);

        const { dispatch, currentChannel } = nextProps;
        if (this.props.currentChannel !== currentChannel) {
            dispatch(actions.fetchPosts(currentChannel));
        }

        if (this.props.lists !== nextProps.lists) {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.lists),
            });
        }

    }

    onPressEvent(channel) {
        this.props.dispatch(actions.selectChannel(channel))
    }

    static get defaultProps() {
        return {
            onPressEvent: function() {
                Alert.alert("hello")
            },
            currentChannel: 'reactjs',
            lists: []
        };
    }

    render() {
        const { currentChannel } = this.props;
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:0.5}}>
                        <Button
                            onPress={() => this.onPressEvent('reactjs')}
                            title="reactjs"
                            color="#841584"
                            accessibilityLabel="learn more about reactjs"
                        />
                    </View>
                    <View style={{flex:0.5}}>
                        <Button
                            onPress={() => this.onPressEvent('php')}
                            title="PHP"
                            color="green"
                            accessibilityLabel="learn more about reactjs"
                        />
                    </View>
                </View>
                <View>
                    <Text style={{fontSize:40}}>{currentChannel}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.data['title']}</Text>}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

App.propTypes = {
    onPressEvent: PropTypes.func,
    currentChannel: PropTypes.string,
    lists: PropTypes.array,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    console.log('map state to props');
    console.log(state);
    return {
        currentChannel: state.currentChannel,
        lists: typeof state.posts[state.currentChannel] !== 'undefined' ? state.posts[state.currentChannel]['items'] : []
    }
};

const mapDispatchToProps =  undefined;
//     (dispatch) => {
//     console.log('mapDipatchToProps')
//     return {
//         onPressEvent: function(channel) {
//             dispatch(actions.selectChannel(channel));
//         }
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(App)
