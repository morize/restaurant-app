import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navigation, { ICartItem } from '../Pages/Navigation';
import Subnavigation from './Subnavigation';

const Layout = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const pathName = useLocation().pathname;

  const determineSubnavigation = () => {
    if (
      pathName === '/app/cafeteria' ||
      pathName === '/app/admin' ||
      pathName !== '/app/cafeteria/checkout'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addToCart = (newCartItem: ICartItem) => {
    const newArray = [...cartItems];
    if (cartItems.length >= 1) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === newCartItem.id) {
          if (newCartItem.quantity === 0) {
            newArray.splice(i, 1);
          } else {
            newArray[i] = newCartItem;
          }
          setCartItems(newArray);
          return;
        }
      }
      newArray.push(newCartItem);
      setCartItems(newArray);
      return;
    }

    newArray.push(newCartItem);
    setCartItems(newArray);
  };

  return (
    <>
      <Navigation cartItems={cartItems} />

      <div className="flex w-full min-h-screen text-white bg-black bg-opacity-80">
        <div className="flex w-[1720px] m-auto">
          {determineSubnavigation() && <Subnavigation />}

          <main className="w-4/5 px-44 py-44 mx-auto">
            <Outlet context={{ cartItems, addToCart }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
