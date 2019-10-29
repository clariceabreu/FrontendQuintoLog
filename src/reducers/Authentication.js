import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_AUTHENTICATION } = TYPES;

export default (state = INITIAL_STATE.authentication, action) => {
    switch(action.type) {
        case SET_AUTHENTICATION:
            return action.payload;
        default:
            return state;
    }
}