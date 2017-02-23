export const TYPE_FETCHING = 'TYPE_FETCHING';
export const TYPE_RECEIVED_POSTS = 'TYPE_RECEIVED_POSTS';
export const TYPE_SELECT_CHANNEL = 'TYPE_SELECT_CHANNEL';

export function fetchPosts(channel) {
    return function(dispatch) {
        let url = 'https://www.reddit.com/r/' + channel + '.json';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receivedPosts(channel, json)))
            .catch(error => {
                console.error(error)
            })
    }
}

export function fetching() {
    return {
        type: TYPE_FETCHING,
        isFetching: true
    }
}

export function receivedPosts(channle, receivedData) {
    //console.log()('received posts')
    //console.log()(channle);
    //console.log()(receivedData);

    return {
        type: TYPE_RECEIVED_POSTS,
        channel: channle,
        isFetching: false,
        receivedData: receivedData
    }
}

export function selectChannel(channel) {
    return {
        type: TYPE_SELECT_CHANNEL,
        channel: channel
    }
}


/**
 * state tree
 * {
 *      posts:{
 *          reactjs: {
 *              items: [],
 *              isFetching: false,
 *              lastUpdatedAt: timestamp
 *          },
 *          php: {
 *              items: [],
 *              isFetching: false,
 *              lastUpdatedAt: timestamp
 *          },
 *      },
 *      currentChannel: 'reactjs',
 *      currentPage: 2
 * }
 */
