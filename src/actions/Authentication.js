import { TYPES } from '../store/types';
import { Axios } from '../utils';
import { showToast } from './System';
const {
    SET_AUTHENTICATION,
    TYPES.SET_TOKEN
} = TYPES

export const register = (data) => {
    let body = {...data};
    delete body.history;
    return (dispatch) => {
        Axios.post('/user', body)
        .then((response) => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: response.data
            })
            signIn({
                email: body.email,
                password: body.password,
                history: data.history
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

export const signIn = (data) => {
    const body = {...data};
    delete body.history;
    return (dispatch) => {
        Axios.post( '/oauth/token', body)
        .then(response => {
            dispatch({
                type: TYPES.SET_TOKEN,
                payload: response.data
            })

            Axios.get('/user?email=' + body.email)
            .then(response => {
                dispatch({
                    type: SET_AUTHENTICATION,
                    payload: response.data
                })

                data.history.push('/');
            })
            .catch((error) => {
                throw error;
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch(showToast({
                open: true,
                message: 'Erro ao efetuar login',
                type: 'error'
            }));
        });        
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
        Axios.put('/user' , body)
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
        Axios.put('/changePassword' , body)
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
        Axios.put('/recoverPassword' , body)
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