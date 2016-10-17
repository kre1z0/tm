import React from 'react';
import { IndexRedirect, Route } from 'react-router';

// Base containers
import App from '../containers/app';
import Dashboard from '../containers/dashboard';
import Auth from '../containers/auth';

// Helper components
import requireNotAuthentication from '../components/notAuthenticated';
import requireAuthentication from '../components/authenticated';

// Views
import RegisterView from '../views/auth/register';
import LoginView from '../views/auth/login';
import TasksView from '../views/tasks';
import UsersView from '../views/users';
import NotFound from '../views/notfound';

/**
 * Configure routes
 * @param <Object> store
 * @return <Object> routes
 */
export default (store) => (
    <Route component={ App }>
        <Route path="/auth" component={ requireNotAuthentication(Auth) }>
            <Route path="login" component={ LoginView } />
            <Route path="register" component={ RegisterView } />
        </Route>
        <Route path="/" component={ requireAuthentication(Dashboard) }>
            <IndexRedirect to="/tasks" />
            <Route path="tasks" component={ TasksView }>
                <Route path="page/:page" />
            </Route>
            <Route path="users" component={ UsersView }>
                <Route path="page/:page" />
            </Route>
        </Route>
        <Route path="*" component={ NotFound } />
    </Route>
);