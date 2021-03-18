import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";


import { AuthContext } from '../auth/AuthContext';
import { AuthRoute } from './AuthRoute';
import { DashbordRoute } from './DashbordRoute';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const {user} = useContext(AuthContext)
    
    return (
        <Router>
            <div className="container">
                <Switch>

                    <PublicRoute  
                        path="/login" 
                        component={AuthRoute} 
                        isAuthenticated={user.logged} 
                    />

                    {/* rutas con autenticación */}

                    <PrivateRoute 
                        path="/" 
                        component={DashbordRoute}
                        isAuthenticated={user.logged}
                    />
                    

                </Switch>
            </div>
        </Router>
    )
}
