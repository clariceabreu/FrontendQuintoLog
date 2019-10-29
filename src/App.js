 import React from 'react';
import Home from './components/Home';
import Register from "./components/Register";
import Login from "./components/Login";
import LogInfo from "./components/LogInfo";
import Profile from "./components/Profile";
import { Provider } from 'react-redux';
import {
    Router,
    Route,
    Switch
} from "react-router-dom";
import { store } from './store';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/login" exact={true} component={Login}/>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/register" exact={true} component={Register}/>
                    <Route path="/logInfo/:id" exact={true} render={(props) => <LogInfo {...props}/>}/>
                    <Route path="/profile" exact={true} component={Profile}/>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;