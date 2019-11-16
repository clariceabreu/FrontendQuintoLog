import { TYPES } from '../store/types';
import { Axios } from "../utils";
import { showToast } from './System';
import { clearLogs } from './Logs';
import { clearSystem } from './System'; 
const {
    CLEAR,
    SET_USER_DATA,
    SET_TOKEN
} = TYPES

export const register = (data) => {
    let body = {...data};
    delete body.history;    
    return (dispatch) => {
        Axios.post('https://quinto-log-back.herokuapp.com/v1/users', body)
        .then((response) => {
            dispatch({
                type: SET_USER_DATA,
                payload: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    security_question: response.data.security_question,
                    security_answer: response.data.security_answer
                }
            })
            
            Axios.post( 'https://quinto-log-back.herokuapp.com/oauth/token', {
                email: body.email,
                password: body.password
            })
            .then(response => {
                dispatch({
                    type: SET_TOKEN,
                    payload: response.data.token
                })

                data.history.push('/');
            })
            .catch((error) => {
                throw error;
            });
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
        Axios.post( 'https://quinto-log-back.herokuapp.com/oauth/token', body)
        .then(response => {
            dispatch({
                type: SET_TOKEN,
                payload: response.data.token
            })

            Axios.put('https://quinto-log-back.herokuapp.com/v1/users/getData', { email:  body.email })
            .then(response => {
                dispatch({
                    type: SET_USER_DATA,
                    payload: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        security_question: response.data.security_question,
                        security_answer: response.data.security_answer
                    }
                })

                data.history.push('/');
            })
            .catch((error) => {
                throw error;
            });
        })
        .catch((error) => {
            if (error.response && error.response.status && error.response.status === 403)
                dispatch(showToast({
                    open: true,
                    message: 'Usuário ou senha inválidos',
                    type: 'error'
                }));
            else 
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
            type: CLEAR,
        })
        dispatch(clearLogs({
            type: CLEAR,
        }))
    dispatch(clearSystem({
            type: CLEAR,
        }))

    }
}

export const updateUser = (body) => {
    console.log(body);
    return (dispatch) => {
        Axios.put('https://quinto-log-back.herokuapp.com/v1/users/' + body.id , body)
        .then((response) => {
            dispatch({
                type: SET_USER_DATA,
                payload: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    security_question: response.data.security_question,
                    security_answer: response.data.security_answer
                }
            })

            dispatch(showToast({
                open: true,
                message: 'Dados atualizados com sucesso',
                type: 'success'
            }));
        })
        .catch((error) => {
            console.log(error);
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
        Axios.put('https://quinto-log-back.herokuapp.com/v1/users/changePassword/' + body.id, body)
        .then((response) => {
            dispatch(showToast({
                open: true,
                message: 'Senha atualizada com sucesso',
                type: 'success'
            }));
        })
        .catch((error) => {
            console.log(error);
            if (error.response && error.response.status && error.response.status === 401)
                dispatch(showToast({
                    open: true,
                    message: 'Senha anterior incorreta',
                    type: 'error'
                }));
            else 
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
        Axios.put('https://quinto-log-back.herokuapp.com/v1/users/recoverPassword' , body)
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