import { combineReducers } from 'redux';
import * as actionType from '../actions';


function post() {

}

export function posts(state = {}, action) {
    //console.log('action');
    //console.log(action);
    let returnVal = {};
    switch(action.type) {
        case actionType.TYPE_RECEIVED_POSTS:
            // if (typeof state[action.channel] !== 'undefined'
            //     && state[action.channel]['items'].length > 0
            // ) {
            //     //cache的列表
            //     return state;
            // } else {
                returnVal = {
                    ...state,
                    [action.channel] : {
                        ...state[action.channel],
                        items: action.receivedData.data.children,
                        after: action.receivedData.data.after,
                        isFetching: false,
                        lastUpdatedAt: Date.now(),
                    }
                };

                //console.log('returnval');
                //console.log(returnVal);

                return returnVal;
            // }
        case actionType.TYPE_GET_NEXT_PAGE:
                returnVal = {
                    ...state,
                    [action.channel] : {
                        ...state[action.channel],
                        currentPage:
                            (typeof state[action.channel] !== 'undefined' &&
                            typeof state[action.channel]['after'] !== 'undefined' )?
                            state[action.channel]['after'] : ''
                    }
                };
                //console.log('type-get returnval');
                //console.log(returnVal);
                return returnVal;
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