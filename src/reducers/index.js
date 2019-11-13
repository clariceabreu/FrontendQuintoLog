import { combineReducers } from 'redux';
import authentication from './Authentication';
import logs from './Logs';
import system from './System';

const reducers = combineReducers({
    authentication,
    logs,
    system
});

export default (state, action) => reducers(state, action);