import { useQuery } from '@apollo/client';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { ICartItems } from '../Pages/Overview';
import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

const PrivateRoute = () => {
  const { loading, error } = useQuery<UserData>(GET_CURRENT_USER);
  const { addToCart } = useOutletContext<ICartItems>();

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
    <Outlet context={{ addToCart }} />
  );
};

export default PrivateRoute;
