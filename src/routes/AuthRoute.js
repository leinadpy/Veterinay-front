import React from 'react'
import { Route, Switch } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { TypeOfUser } from '../components/auth/TypeOfUser'

export const AuthRoute = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/login/register-type" component={TypeOfUser} />
                <Route exact path="/login/register/:type" component={RegisterScreen} />
            </Switch>
        </div>
    )
}
