import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_TOAST } = TYPES;

export default (state = INITIAL_STATE.system, action) => {
    switch(action.type) {
        case SET_TOAST:
            return ({ toast: action.payload });
        default:
            return state;
    }
}