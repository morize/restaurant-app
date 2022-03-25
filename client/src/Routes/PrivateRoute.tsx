import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';

import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

const PrivateRoute = () => {
  const {
    data: userData,
    loading,
    error,
  } = useQuery<UserData>(GET_CURRENT_USER);

  return !userData && !loading && error ? (
    <Navigate
      to="/"
      state="Please login before accessing this page"
      replace={true}
    />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
