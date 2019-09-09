import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_ALL_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return { ...state, [payload.id]: payload }
        case DELETE_STREAM: // first param is the collection, and second param is the specific payload / record which lodash will delete.
            return _.omit(state, payload)
        case FETCH_ALL_STREAMS:
            return { ...state, ..._.mapKeys(payload, 'id') }
        default:
            return state
    }
}
