import {TYPES} from '../store/types';
import { Axios } from '../utils';
import { showToast } from './System';
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
            dispatch(showToast({
                open: true,
                message: 'Erro ao realizar cadastro',
                type: 'error'
            }));
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
            // dispatch(showToast({
            //     open: true,
            //     message: 'Erro ao efetuar login',
            //     type: 'error'
            // }));
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

export const updateUser = (body) => {
    return (dispatch) => {
        Axios.put( 'PATH' , body)
        .then((response) => {
            dispatch(showToast({
                open: true,
                message: 'Dados atualizados com sucesso',
                type: 'success'
            }));
        })
        .catch(() => {
            dispatch(showToast({
                open: true,
                message: 'Erro ao atualizados dados',
                type: 'error'
            }));
        });
    }
}

export const changePassword = (body) => {
    return (dispatch) => {
        Axios.put( 'PATH' , body)
        .then((response) => {
            dispatch(showToast({
                open: true,
                message: 'Senha atualizada com sucesso',
                type: 'success'
            }));
        })
        .catch(() => {
            dispatch(showToast({
                open: true,
                message: 'Erro ao alterar senha',
                type: 'error'
            }));
        });
    }
}

export const recoverPassword = (body) => {
    return (dispatch) => {
        Axios.put( 'PATH' , body)
        .then((response) => {
            dispatch(showToast({
                open: true,
                message: 'Senha alterar com sucesso',
                type: 'success'
            }));
        })
        .catch(() => {
            dispatch(showToast({
                open: true,
                message: 'Erro ao alterar senha',
                type: 'error'
            }));
        });
    }
}