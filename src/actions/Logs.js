import {TYPES} from '../store/types';
import { Axios } from '../utils';
import { showToast } from './System';
const {
    SET_LOGS,
} = TYPES

export const getLogs = () => {
    return (dispatch) => {
        Axios.get('/v1/logs')
        .then((response) => {
            dispatch({
                type: SET_LOGS,
                payload: response.data
            })
        })
        .catch((error) => {
            console.log(error);
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

        Axios.put('/v1/logs', body)
        .then((response) => {
            let result = [...logs];
            if (body.status == 'deleted') result = logs.filter(l => l.id != response.data)
            else {
                const index = logs.findIndex(l => l.id == body.id);
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
                    body.status == 'deleted' ? 'Erro ao apagar dado(s)' : 
                    body.status == 'archived' ? 'Erro ao arquivar dado(s)' : 
                        'Erro ao desarquivar dado(s)',
                type: 'error'
            }));
        });
    }
}

// export const archiveLog = (body) => {
//     return (dispatch, getState) => {
//         const { logs } = getState();
        
//         Axios.post( 'PATH' , body)
//         .then((response) => {
//             let log = logs.find(l => l.id == response.data.id);
//             log = response.data;


//             dispatch({
//                 type: SET_LOGS,
//                 payload: logs
//             })
//         })
//         .catch(() => {
            
//         });
//     }
// }