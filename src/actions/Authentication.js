import {TYPES} from '../store/types';
import { Axios } from '../utils';
const {
    SET_AUTHENTICATION
} = TYPES

export const register = (body) => {
    return (dispatch) => {
        Axios.post( 'PATH' , body)
        .then((response) => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: response.data
            })
        })
        .catch(() => {
            
        });
    }
}

export const signIn = (body) => {
    return (dispatch) => {
        // Axios.post( 'PATH' , body)
        // .then((/oauth/token) => {
        //     dispatch({
        //         type: SET_AUTHENTICATION,
        //         payload: response.data
        //     })
        // })
        // .catch(() => {
            
        // });

        dispatch({
            type: SET_AUTHENTICATION,
            payload: {
                token: 'jsjsjsjsjsjjsjsjjsjsjajaj',
                name: 'Clarice'
            }
        })

        body.history.push('/');
        
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: SET_AUTHENTICATION,
            payload: {}
        })
    }
}