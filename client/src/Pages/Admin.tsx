import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ListItemButton from '../Components/ListItemButton';

const Admin = () => {
  // Override with admin layout later
  const navigate = useNavigate();
  const [page, setPage] = useState('');

  return (
    <div className="flex w-full h-auto text-white text-sm">
      <div className="sticky top-14 inline-flex flex-col w-1/5 h-[500px] pr-20">
        <h2 className="text-3xl text-center">Admin</h2>
        <p className="mt-4 mb-8 text-center ">Control Page</p>
        <div className="mt-10 m-auto">
          <ul className="flex flex-col gap-y-8 justify-center">
            <ListItemButton
              label="Items"
              onClick={() => {
                setPage('items');
                navigate('items');
              }}
            />
            <ListItemButton
              label="Orders"
              onClick={() => {
                setPage('orders');
                navigate('orders');
              }}
            />
            <ListItemButton
              label="Users"
              onClick={() => {
                setPage('users');
                navigate('users');
              }}
            />
          </ul>
        </div>
      </div>

      <div className="inline-flex flex-col w-3/4 min-h-[70rem] ml-12 px-24 py-16 bg-[#261000]">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
