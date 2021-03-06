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
    <nav className="fixed w-full top-0 flex h-[100px] px-44 py-6 bg-[#402200] text-white z-10">
      <ul className="flex gap-14">
        <NavListItem
          label="Cafeteria"
          icon={<MenuIcon />}
          onClick={() => navigate('/app/cafeteria')}
        />
        <NavListItem
          label="About Us"
          icon={<ContactIcon />}
          onClick={() => navigate('/app/about')}
        />
        <NavListItem
          label="Account"
          icon={<AccountIcon />}
          onClick={() => navigate('/app/account')}
        />
      </ul>

      <ul className="flex gap-14 ml-auto">
        <NavListItem
          label="Cart"
          icon={<CartIcon />}
          onClick={(e) =>
            cartItems.length > 0 &&
            navigate('/app/cafeteria/checkout', { state: cartItems })
          }
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
