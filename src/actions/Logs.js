import {TYPES} from '../store/types';
import { Axios, ServerlessEndpoint } from '../utils';
const {
    SET_LOGS,
} = TYPES

export const getLogs = () => {
    return (dispatch) => {
        Axios.get( 'PATH' )
        .then((response) => {
            dispatch({
                type: SET_LOGS,
                payload: response.data
            })
        })
        .catch(() => {
            
        });
    }
}

export const updateLog = (body) => {
    return (dispatch, getState) => {
        const { logs } = getState();

        Axios.post( 'PATH' , body)
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
        .catch(() => {
            
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