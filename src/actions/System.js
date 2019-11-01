import {TYPES} from '../store/types';
const {
    SET_TOAST
} = TYPES

export const showToast = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_TOAST,
            payload: data
        })
    }
}