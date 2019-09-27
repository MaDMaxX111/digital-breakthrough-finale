import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import privateRoutes from './routes/private';
import commonRoutes from './routes/common';
import boot from './redux/boot';
import authActions from './redux/auth/actions';
import { LOGIN_URL } from './constants/route';

const { logout } = authActions

const RestrictedRoute = ({component: Component, logged, ...rest}) => {
    return (
        <Route
            {...rest}
            component={Component}
            render={props =>
                logged || true ? (
                    <Component {...props} key={new Date()}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN_URL,
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}

export const MainContainer = ({isLogged = false, userData = {}, logout}) => {

    const [booting, setBooting] = useState(true)

    useEffect(() => {
        async function booting() {
            await boot();
            setBooting(false);
        }

        booting();
    }, []);

    return (
        !booting ?
                <Router>
                    {privateRoutes.map((route, index) => (
                        <RestrictedRoute
                            key={index}
                            // exact
                            path={route.path}
                            component={route.component}
                            logged={isLogged}
                        />
                    ))}
                    {commonRoutes.map((route, index) => (
                        <Route
                            key={index}
                            exact
                            path={route.path}
                            component={route.component}
                        />
                    ))}
                </Router>
            : null
    )
};

MainContainer.propTypes = {
    isLogged: PropTypes.bool,
    userData: PropTypes.object,
    logout: PropTypes.func,
};

export default connect(
    state => {
        const {Auth} = state;
        return {
            ...Auth
        }
    }, {
        logout,
    }
)(MainContainer)
