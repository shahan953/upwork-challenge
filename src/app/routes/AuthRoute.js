import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Dummy Token

const AuthRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  isAuthenticated ?
    <Redirect to={'/dashboard'} />
    :
    <Route {...rest} component={(props) => {
      return (
        <div>
          <Component {...props} />
        </div>
      )
    }} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
})

export default connect(mapStateToProps)(AuthRoute);