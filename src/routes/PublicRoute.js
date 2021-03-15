import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    
    const {user:{admin}} = useContext(AuthContext);
    let path = (admin) ? 'admin' : 'user'
    return (
        <Route { ...rest }
            component={ (props) => (
                ( !isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to={`/${path}`} /> )
            )}
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
