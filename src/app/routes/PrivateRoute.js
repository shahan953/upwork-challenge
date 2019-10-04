import React from 'react';
import { connect } from 'react-redux';
import{ Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (
    isAuthenticated ? (
        <Route {...rest} component={(props)=> (
          <Component {...props}/>
        )}/>
    )
    : <Redirect to="/"/>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token,
})

export default connect(mapStateToProps)(PrivateRoute);