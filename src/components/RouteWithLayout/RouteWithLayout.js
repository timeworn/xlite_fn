import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'src/store/selectors/user';

const RouteWithLayout = props => {
  const { path, layout: Layout, component: Component, isAuth = true, ...rest } = props;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn && isAuth) {
    let from = path === '/' ? '' : '?from=' + path;
    return <Redirect from={path} to={'/sign-in' + from}/>;
  }

  return (
    <Route path={path}
           {...rest}
           render={matchProps => (
             <Layout>
               <Component {...matchProps} />
             </Layout>
           )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isAuth: PropTypes.bool
};

export default RouteWithLayout;
