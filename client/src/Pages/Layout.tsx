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
      <nav className="sticky top-0 flex w-full h-[120px] px-[200px] text-white bg-[#402200] items-center z-10">
        <ul className="flex flex-wrap gap-[56px]">
          <NavListItem label="Cafeteria" icon={<MenuIcon />} />
          <NavListItem label="About Us" icon={<ContactIcon />} />
        </ul>

        <ul className="flex ml-auto gap-[56px]">
          <NavListItem label="Cart" icon={<CartIcon />} />
          <NavListItem label="Account" icon={<AccountIcon />} />
          <NavListItem label="Logout" icon={<LogoutIcon />} />
        </ul>
      </nav>

      <main className="flex w-full">
        <div className="w-11/12 my-[42px] min-h-[calc(100vh-120px)] mx-auto py-[64px] px-[120px] bg-black bg-opacity-70">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
