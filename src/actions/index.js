import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_ALL_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from './types';

import stream from '../api/stream'

export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    }
};
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
};

// create strea
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    console.log(userId);
    const response = await stream.post('/streams', { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
}

// get streams
export const fetchAllStreams = () => async dispatch => {
    const response = await stream.get('/streams')
    console.log(response.data)
    dispatch({ type: FETCH_ALL_STREAMS, payload: response.data })
}

// get stream
export const fetchStream = id => async dispatch => {
    const response = await stream.get(`/streams/${id}`)
    dispatch({ type: FETCH_STREAM, payload: response.data })
}

// edit stream
export const editStream = (id, formValues) => async dispatch => {
    const response = await stream.put(`/streams/${id}`, formValues)
    dispatch({ type: EDIT_STREAM, payload: response.data })
}

// delete stream
export const deleteStream = id => async dispatch => {
    const response = await stream.delete(`/streams/${id}`)
    dispatch({ type: DELETE_STREAM, payload: response.data })
}