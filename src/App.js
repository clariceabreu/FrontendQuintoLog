 import React from 'react';
import Home from './components/pages/Home';
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import LogInfo from "./components/pages/LogInfo";
import Profile from "./components/pages/Profile";
import ForgotPassword from './components/pages/ForgotPassword';
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
                    <Route path="/cadastro" exact={true} component={Register}/>
                    <Route path="/logInfo/:id" exact={true} render={(props) => <LogInfo {...props}/>}/>
                    <Route path="/perfil" exact={true} component={Profile}/>
                    <Route path="/recuperarSenha" exact={true} component={ForgotPassword}/>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;