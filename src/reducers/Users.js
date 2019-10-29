import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_USERS } = TYPES;

export default (state = INITIAL_STATE.users, action) => {
    switch(action.type) {
        case SET_USERS:
            return action.payload;
        default:
            return state;
    }
}