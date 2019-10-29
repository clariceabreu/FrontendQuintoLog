import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_LOGS } = TYPES;

export default (state = INITIAL_STATE.logs, action) => {
    switch(action.type) {
        case SET_LOGS:
            return action.payload;
        default:
            return state;
    }
}