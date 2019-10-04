/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

// Routes
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

// Index Routes

import {
  Auth,
  Private, 
  Public
} from './Router';
import { NotFound } from '../components';
import { Header, Footer } from '../components/common';

// Components

export const history = createBrowserHistory()

class RouterConfig extends Component {
  render() {
    return (
      <div>
         <Router history={history}>
            <div className="pt-5 mt-4">
            <Header/>
              <Switch>
                {
                  Public.map((R, k) => {
                    return <Route key={k} path={R.path} component={R.component} exact={R.exact}/>
                  })
                }
                {
                  Private.map((R, k) => {
                    return <PrivateRoute key={k} path={R.path} component={R.component} exact={R.exact}/>
                  })
                }
                {
                  Auth.map((R, k) => {
                    return <AuthRoute key={k} path={R.path} component={R.component} exact={R.exact}/>
                  })
                }
                <Route component={NotFound}/>
              </Switch>
              <Footer />
            </div>
          </Router>
      </div>
    )
  }
}

export const AppRouter = RouterConfig;
