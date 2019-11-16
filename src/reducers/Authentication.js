import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  CLEAR, SET_TOKEN, SET_USER_DATA } = TYPES;

export default (state = INITIAL_STATE.authentication, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {...state, userData: action.payload};
        case SET_TOKEN:
            return {...state, token: action.payload};
        case CLEAR:
            return INITIAL_STATE.authentication;
        default:
            return state;
    }
}