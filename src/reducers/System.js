import { TYPES } from '../store/types';
import { INITIAL_STATE } from '../store/states'
const {  SET_TOAST, START_LOADING, STOP_LOADING, CLEAR } = TYPES;

export default (state = INITIAL_STATE.system, action) => {
    switch(action.type) {
        case SET_TOAST:
            return {...state, toast: action.payload };
        case START_LOADING:
            return {...state, loadingUrls: [].concat(...state.loadingUrls, action.payload) };
        case STOP_LOADING:
            return {...state, loadingUrls: state.loadingUrls.filter(u => u !== action.payload)};
        case CLEAR:
            return INITIAL_STATE.system;
        default:
            return state;
    }
}