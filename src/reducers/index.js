import { combineReducers } from 'redux';
import authentication from './Authentication';
import logs from './Logs';
import users from './Users';

const reducers = combineReducers({
    authentication,
    logs,
    users
});

export default (state, action) => reducers(state, action);