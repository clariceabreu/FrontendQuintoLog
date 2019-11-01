import { combineReducers } from 'redux';
import authentication from './Authentication';
import logs from './Logs';
import users from './Users';
import system from './System';

const reducers = combineReducers({
    authentication,
    logs,
    users,
    system
});

export default (state, action) => reducers(state, action);