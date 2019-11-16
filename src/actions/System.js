import {TYPES} from '../store/types';
const {
    SET_TOAST,
    START_LOADING, 
    STOP_LOADING,
    CLEAR
} = TYPES

export const showToast = (data) => {
    return  (dispatch) => {
        dispatch({
            type: SET_TOAST,
            payload: data
        })
    }
}

export const startLoading = (url) => {
    return (dispatch) => {
        dispatch({
            type: START_LOADING,
            payload: url
        })
    }
}

export const stopLoading = (url) => {
    return (dispatch) => {
        dispatch({
            type: STOP_LOADING,
            payload: url
        })
    }
}

export const clearSystem = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR
        })
    }
}