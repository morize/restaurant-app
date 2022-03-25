import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import NavListItem from '../Components/NavListItem';
import {
  MenuIcon,
  ContactIcon,
  CartIcon,
  AccountIcon,
  LogoutIcon,
} from '../Utils/Icons';
import { config } from '../Utils/config';

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Layout = () => {
  const navigate = useNavigate();
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
      <nav className="sticky top-0 flex items-center w-full h-28 px-44 text-white bg-[#402200] z-10">
        <ul className="flex flex-wrap gap-14">
          <NavListItem
            label="Cafeteria"
            icon={<MenuIcon />}
            onClick={() => navigate('/cafeteria')}
          />
          <NavListItem
            label="About Us"
            icon={<ContactIcon />}
            onClick={() => navigate('/about')}
          />
          <NavListItem
            label="Account"
            icon={<AccountIcon />}
            onClick={() => navigate('/account')}
          />
        </ul>

        <ul className="flex ml-auto gap-14">
          <NavListItem
            label="Cart"
            icon={<CartIcon />}
            onClick={(e) => {
              e.preventDefault();
              cartItems.length !== 0 &&
                navigate('/cafeteria/checkout', { state: cartItems });
            }}
          >
            <span className="flex items-center justify-center absolute right-0 w-8 h-8 rounded-full bg-red-700">
              {cartItems.length}
            </span>
          </NavListItem>

          <NavListItem
            label="Logout"
            icon={<LogoutIcon />}
            onClick={() => {
              window.location.href = `${config.API_URL}/auth/logout`;
            }}
          />
        </ul>
      </nav>

      <main className="flex w-full">
        <div className="w-11/12 h-[calc(100vh-160px)] my-6 mx-auto py-16 px-20 bg-black bg-opacity-70 overflow-y-auto">
          <Outlet context={{ cartItems, addToCart }} />
        </div>
      </main>
    </>
  );
};

export default Layout;
