import { TYPES } from '../store/types';
import { Axios } from '../utils';
import { showToast } from './System';
const {
    SET_AUTHENTICATION
} = TYPES

export const register = (data) => {
    let body = {...data};
    delete body.history;
    console.log(body);
    return (dispatch) => {
        Axios.post('/users', body)
        .then((response) => {
            console.log(response);
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
        console.log(body);
        Axios.post( '/oauth/token/', body)
        .then(response => {
            console.log(response)
            dispatch({
                type: TYPES.SET_TOKEN,
                payload: response.data
            })

            console.log("test");

            Axios.get('/users?email=' + body.email)
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
        Axios.put('/users' , body)
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