import React, { useContext } from 'react'
import {Redirect, Route, Switch } from 'react-router'
import { AuthContext } from '../auth/AuthContext';
import { AdminScreen } from '../components/user/AdminScreen';
import { SettingsScreen } from '../components/user/SettingsScreen';
import { ShowCardScreen } from '../components/user/ShowCardScreen';
import { UserScreen } from '../components/user/UserScreen';


export const DashbordRoute = () => {

    const {user:{admin}} = useContext(AuthContext);
    let path = (admin) ? 'admin' : 'user'

    return (
        <div>
            <Switch>
                {
                    (admin)

                    ?<Route exact path="/admin" component={AdminScreen} />
    
                    : <Route exact path="/user" component={UserScreen} />
                }
                

                <Route exact path="/card/:type" component={ShowCardScreen} />

                <Route exact path="/setting/:setting" component={SettingsScreen} />

                <Redirect to={`/${path}`} />

            </Switch>
        </div>
    )
}
