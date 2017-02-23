import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Page2 from './Page2';

import AppHeader from '../components/AppHeader';

const {
    View, Text, Button, Alert, ListView
} = ReactNative;


class App extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
        // this._onPressEvent = this._onPressEvent.bind(this);
    }

    componentDidMount() {
        const { dispatch, currentChannel } = this.props;
        dispatch(actions.fetchPosts(currentChannel));
    }

    componentWillReceiveProps(nextProps) {
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

    _onPressEvent(channel) {
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

    _pressBackBtn() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'Page2',
                component: Page2
            })
        }
    }

    render() {
        const { currentChannel } = this.props;
        let i = 0;
        let channelArray = ['reactjs', 'nodejs', 'jquery', 'python'];
        return (
            <View>
                <AppHeader/>
                <View style={styles.buttonView}>
                    <Button
                        onPress={this._pressBackBtn.bind(this)}
                        title='<Back'
                    />
                    {
                        channelArray.map(
                            _channel => (
                                <View key={_channel} >
                                    <Button
                                        onPress={() => this._onPressEvent(_channel)}
                                        title={_channel}
                                        color={
                                                _channel === currentChannel ? styles.selectedBtn.color :
                                                    (i++ % 2 === 0 ? styles.button.color : styles.button2.color)
                                        }
                                    />
                                </View>)
                        )
                    }
                </View>
                <View>
                    <Text style={styles.channelTitle}>{currentChannel}</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        if (typeof rowData.data === 'undefined') {
                            return '';
                        }
                        return (
                            <Text>{rowData.data['title']}</Text>
                        );
                    }}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

const styles = {
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        color: 'darkgreen'
    },
    button2: {
        color: 'darkblue'
    },
    selectedBtn: {
        color: 'red'
    },
    channelTitle: {
        fontSize: 30
    }
};

App.propTypes = {
    onPressEvent: PropTypes.func,
    currentChannel: PropTypes.string,
    lists: PropTypes.array,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    //console.log()('map state to props');
    //console.log()(state);
    return {
        currentChannel: state.currentChannel,
        lists: typeof state.posts[state.currentChannel] !== 'undefined' ? state.posts[state.currentChannel]['items'] : []
    }
};

const mapDispatchToProps =  undefined;

export default connect(mapStateToProps, mapDispatchToProps)(App)
