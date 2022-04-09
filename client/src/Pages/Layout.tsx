import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation, { ICartItem } from '../Pages/Navigation';
import Subnavigation from './Subnavigation';

const Layout = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

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

      <div className="flex mt-8 mx-16 text-white bg-black bg-opacity-70">
        <Subnavigation />

        <main className="flex m-auto w-4/5 min-h-screen p-8">
          <Outlet context={{ cartItems, addToCart }} />
        </main>
      </div>
    </>
  );
};

export default Layout;
