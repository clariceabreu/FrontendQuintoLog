import { TYPES } from '../store/types';
import { Axios } from '../utils';
const {
    SET_USERS
} = TYPES

export const getUsers = () => {
    return (dispatch) => {
        Axios.get( 'PATH')
        .then((response) => {
            dispatch({
                type: SET_USERS,
                payload: response.data
            })
        })
        .catch(() => {
            
        });
    }
}