import React, { Component, PropTypes } from 'react'
import { View, Text, Button, Alert, ListView } from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../actions'

class App extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
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
        let i = 0;
        let channelArray = ['reactjs', 'javascript', 'php', 'python'];
        return (
            <View>
                <View style={styles.buttonView}>
                    {
                        channelArray.map(
                            _channel => (
                                <View key={_channel} style={{flex: 1 / channelArray.length}}>
                                    <Button
                                        onPress={() => this.onPressEvent(_channel)}
                                        title={_channel}
                                        color={i++ % 2 === 0 ? styles.button.color : styles.button2.color}
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
        justifyContent: 'center'
    },
    button: {
        // flex: 0.5
        color: 'rgb(193, 235, 78)'
    },
    button2: {
        color: 'blue'
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
    console.log('map state to props');
    console.log(state);
    return {
        currentChannel: state.currentChannel,
        lists: typeof state.posts[state.currentChannel] !== 'undefined' ? state.posts[state.currentChannel]['items'] : []
    }
};

const mapDispatchToProps =  undefined;

export default connect(mapStateToProps, mapDispatchToProps)(App)
