import { Outlet } from 'react-router-dom';

import NavListItem from '../Components/NavListItem';
import {
  MenuIcon,
  ContactIcon,
  CartIcon,
  AccountIcon,
  LogoutIcon,
} from '../Utils/Icons';

const Layout = () => {
  return (
    <>
      <nav className="sticky top-0 flex items-center w-full h-28 px-44 text-white bg-[#402200] z-10">
        <ul className="flex flex-wrap gap-14">
          <NavListItem label="Cafeteria" icon={<MenuIcon />} />
          <NavListItem label="About Us" icon={<ContactIcon />} />
          <NavListItem label="Account" icon={<AccountIcon />} />
        </ul>

        <ul className="flex ml-auto gap-14">
          <NavListItem label="Cart" icon={<CartIcon />} />
          <NavListItem label="Logout" icon={<LogoutIcon />} />
        </ul>
      </nav>

      <main className="flex w-full">
        <div className="w-11/12 h-[calc(100vh-160px)] my-6 mx-auto py-16 px-20 bg-black bg-opacity-70 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
