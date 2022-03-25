import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';

import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

interface IPrivateRoute {
  admin?: boolean;
}

const PrivateRoute = ({ admin }: IPrivateRoute) => {
  const {
    data: userData,
    loading,
    error,
  } = useQuery<UserData>(GET_CURRENT_USER);

  if (!loading && admin && userData) {
    return userData.getCurrentUser.role !== 'admin' ? (
      <Navigate
        to="/account"
        state="You are not authorized to enter this page"
        replace={true}
      />
    ) : (
      <Outlet />
    );
  }

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
