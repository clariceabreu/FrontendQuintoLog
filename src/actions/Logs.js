import {TYPES} from '../store/types';
import { Axios } from '../utils';
import { showToast } from './System';
const {
    SET_LOGS,
    CLEAR
} = TYPES

export const getLogs = () => {
    return (dispatch) => {
        Axios.get('https://quinto-log-back.herokuapp.com/v1/logs')
        .then((response) => {
            dispatch({
                type: SET_LOGS,
                payload: response.data
            })
        })
        .catch((error) => {
            if (error.response && error.response.status && error.response.status === 403)
                dispatch(showToast({
                    open: true,
                    message: 'Acesso negado, faça login novamente',
                    type: 'error'
                }));
            else 
                dispatch(showToast({
                    open: true,
                    message: 'Erro ao receber dados',
                    type: 'error'
                }));
            
        });
    }
}

export const updateLog = (body) => {
    return (dispatch, getState) => {
        const { logs } = getState();

        Axios.put('https://quinto-log-back.herokuapp.com/v1/logs/' + body.id, body)
        .then(() => {
            let result = [...logs];
            if (body.status === 'DELETED') result = logs.filter(l => l.id !== body.id);
            else {
                const index = logs.findIndex(l => l.id === body.id);
                result[index].status = body.status;
            }
            
            dispatch({
                type: SET_LOGS,
                payload: result
            })
        })
        .catch((error) => {
            console.log(error);
            dispatch(showToast({
                open: true,
                message: 
                    body.status === 'DELETED' ? 'Erro ao apagar dado(s)' : 
                    body.status === 'ARCHIVED' ? 'Erro ao arquivar dado(s)' : 
                        'Erro ao desarquivar dado(s)',
                type: 'error'
            }));
        });
    }
}

export const clearLogs = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR
        })
    }
}