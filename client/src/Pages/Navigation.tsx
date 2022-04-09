import { useNavigate } from 'react-router-dom';

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

export interface ICartItems {
  cartItems: [ICartItem];
  addToCart: (cartItem: ICartItem) => void;
}

interface INavigation {
  cartItems: ICartItem[];
}

const Navigation = ({ cartItems }: INavigation) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 flex h-26 px-44 py-6 bg-[#402200] text-white z-10">
      <ul className="flex gap-14">
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

      <ul className="flex gap-14 ml-auto">
        <NavListItem
          label="Cart"
          icon={<CartIcon />}
          onClick={(e) => navigate('/cafeteria/checkout', { state: cartItems })}
        >
          <span className="absolute right-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-700">
            {cartItems.length}
          </span>
        </NavListItem>

        <NavListItem
          label="Logout"
          icon={<LogoutIcon />}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${config.API_URL}/auth/logout`;
          }}
        />
      </ul>
    </nav>
  );
};

export default Navigation;
