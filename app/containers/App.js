import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import WebPage from '../pages/WebPage';

import AppHeader from '../components/AppHeader';

const {
    View, Text, Button, Alert, ListView, TouchableHighlight, Image
} = ReactNative;


class App extends Component {
    constructor(props) {
        super(props)
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            newLists: {}
        };
        // this._onPressEvent = this._onPressEvent.bind(this);
    }

    componentDidMount() {
        const { dispatch, currentChannel} = this.props;
        dispatch(actions.fetchPosts(currentChannel));
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, currentChannel, currentPage } = nextProps;
        //console.log(currentPage);
        if (this.props.currentChannel !== currentChannel) {
            dispatch(actions.fetchPosts(currentChannel));
        }

        if (this.props.currentPage !== currentPage) {
            dispatch(actions.fetchPosts(currentChannel, currentPage))
        }

        if (this.props.lists !== nextProps.lists) {
            if (typeof this.ds === 'undefined') {
                this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            }

            newLists = (typeof this.state.newLists[currentChannel] !== 'undefined' ? this.state.newLists[currentChannel] : []).concat(nextProps.lists);
            this.setState({
                newLists: {
                    ...this.state.newLists,
                    [currentChannel]: newLists
                },
                dataSource: this.ds.cloneWithRows(newLists),
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
            lists: [],
            currentPage: ''
        };
    }

    _pressTopic(topicUrl) {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'WebPage',
                component: WebPage,
                params: {
                    url: topicUrl
                }
            })
        }
    }

    _onEndReached() {
        const { currentChannel } = this.props;
        //console.log('reached end');
        //console.log(currentChannel);
        this.props.dispatch(actions.getNextPage(currentChannel));
    }

    _renderRow = (rowData, sectionId, rowID) => {
        if (typeof rowData.data === 'undefined') {
            return '';
        }

        let isOdd = (rowID % 2 === 0);

        //console.log(rowData);

        return (
            <TouchableHighlight onPress={() => this._pressTopic(rowData.data['url'])}>
                    <View  style={{...styles.listViewRowBasic, ...(isOdd ? styles.listViewRow2 : styles.listViewRow)}}>
                        <View style={{flexDirection:'row'}}>
                            <Image
                                style={{height:60, width:60, padding:10}}
                                source={{
                                    uri: (
                                    rowData.data['thumbnail'].length > 0 &&
                                    rowData.data['thumbnail'] !== 'self' &&
                                    rowData.data['thumbnail'] !== 'default')
                                        ?
                                        rowData.data['thumbnail'] :
                                        "http://b.thumbs.redditmedia.com/ghhfiBCmzzVJr1-mOk-VR-4GzdRruEIfX0evjoSf7tc.jpg"
                                }}
                            />
                            <Text style={{color: isOdd? "white" : "black"}}>{rowData.data['title'].substring(0, 120)}</Text>
                        </View>
                    </View>
            </TouchableHighlight>
        );
    }

    render() {
        const { currentChannel } = this.props;
        let i = 0;
        let channelArray = ['reactjs', 'ps4', 'jquery', 'python'];
        return (
            <View>
                <AppHeader/>

                <View style={styles.buttonView}>
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
                <View style={{borderBottomWidth:1, borderColor:'red'}}>
                    <Text style={styles.channelTitle}>{currentChannel}</Text>
                </View>
                {typeof this.state.dataSource === 'undefined' &&
                    <Text>Loading</Text>
                }
                {typeof this.state.dataSource != 'undefined' &&
                    <ListView
                        dataSource={this.state.dataSource}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={1}
                        initialListSize={1}
                        scrollRenderAheadDistance={100}
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        reach
                    />
                }
            </View>
        );
    }
}

const styles = {
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        fontSize: 30,
        color: 'red'
    },
    listViewRowBasic: {
        height:100,
        padding:10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    listViewRow: {
        backgroundColor: 'white',
    },
    listViewRow2: {
        backgroundColor: 'red',
    }
};

App.propTypes = {
    onPressEvent: PropTypes.func,
    currentChannel: PropTypes.string,
    lists: PropTypes.array,
    currentPage: PropTypes.string,
    dispatch: PropTypes.func
};

const mapStateToProps = (state) => {
    ////console.log()('map state to props');
    ////console.log()(state);
    return {
        currentChannel: state.currentChannel,
        lists: typeof state.posts[state.currentChannel] !== 'undefined' ? state.posts[state.currentChannel]['items'] : [],
        currentPage: typeof state.posts[state.currentChannel] !== 'undefined' ? state.posts[state.currentChannel]['currentPage'] : '',
    }
};

const mapDispatchToProps =  undefined;

export default connect(mapStateToProps, mapDispatchToProps)(App)
