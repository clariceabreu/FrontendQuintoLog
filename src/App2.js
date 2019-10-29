import React, { Component } from "react";
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import LogInfo from './components/LogInfo';
import {
    Route,
    Switch
} from "react-router-dom";

const App2  = () => {
    const user = useSelector(state => state.authenticate);

    return (
        <Switch>
            <Route path="/" component={user.token ? Login : Home}/>
            <Route path="/register" component={Register}/>
            <Route path="/logInfo/:id" component={LogInfo}/>
        </Switch>
    );
}
 
export default App2;