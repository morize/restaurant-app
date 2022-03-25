import { useQuery } from '@apollo/client';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { ICartItems } from '../Pages/Layout';
import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

const PrivateRoute = () => {
  const {
    data: userData,
    loading,
    error,
  } = useQuery<UserData>(GET_CURRENT_USER);
  const { cartItems, addToCart } = useOutletContext<ICartItems>();

  return !userData && !loading && error ? (
    <Navigate
      to="/"
      state="Please login before accessing this page"
      replace={true}
    />
  ) : (
    <Outlet context={{ userData, cartItems, addToCart }} />
  );
};

export default PrivateRoute;
