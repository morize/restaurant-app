import { useQuery } from '@apollo/client';
import { Navigate, Outlet } from 'react-router-dom';

import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

const PrivateRoute = () => {
  const { loading, error } = useQuery<UserData>(GET_CURRENT_USER);

  if (!loading && !error) {
    // if (error.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
    //   return <Navigate to="/" />;
    // }
  }
  return !loading && error ? (
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
