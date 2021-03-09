import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";


import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { TypeOfUser } from '../components/auth/TypeOfUser';
import { AdminScreen } from '../components/user/AdminScreen';
import { ShowCardScreen } from '../components/user/ShowCardScreen';
import { UserScreen } from '../components/user/UserScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/register-type" component={TypeOfUser} />
                    <Route exact path="/register/:type" component={RegisterScreen} />
                    <Route exact path="/admin" component={AdminScreen} />
                    <Route exact path="/user" component={UserScreen} />
                    <Route exact path="/card" component={ShowCardScreen} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}
