import { combineReducers } from 'redux';
import * as actionType from '../actions'

export function posts(state = {}, action) {
    switch(action.type) {
        case actionType.TYPE_RECEIVED_POSTS:
            if (typeof state[action.channel] !== 'undefined' && state[action.channel]['items'].length > 0) {
                return state
            } else {
                return  {
                    ...state,
                    [action.channel] : {
                        items: action.receivedData.data.children,
                        isFetching: false,
                        lastUpdatedAt: Date.now()
                    }
                };
            }
        default:
            return state;

    }
}

export function currentChannel(state = 'reactjs', action) {
    switch (action.type) {
        case actionType.TYPE_SELECT_CHANNEL:
            return action.channel;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    posts,
    currentChannel
});

export default rootReducer;