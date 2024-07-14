import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAuth } from '../storage/auth/authSlice';

export default function MyRoute({
  component: Component,
  isClosed = false,
  ...rest
}) {
  const { isLoggedIn } = useSelector(selectAuth);

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
}

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  isClosed: PropTypes.bool,
};
