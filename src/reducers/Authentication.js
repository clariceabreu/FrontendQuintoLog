import { TYPES, SET_AUTHENTICATION, SET_TOKEN } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_AUTHENTICATION } = TYPES;

export default (state = INITIAL_STATE.authentication, action) => {
    switch(action.type) {
        case SET_AUTHENTICATION:
            return action.payload;
        case SET_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
}