import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation, { ICartItem } from '../Pages/Navigation';

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

      <main>
        <div className="w-11/12 h-[800px] my-6 mx-auto py-16 px-20 bg-black bg-opacity-70 overflow-auto">
          <Outlet context={{ cartItems, addToCart }} />
        </div>
      </main>
    </>
  );
};

export default Layout;
