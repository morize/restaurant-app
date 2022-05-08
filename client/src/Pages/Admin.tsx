import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ListItemButton from '../Components/ListItemButton';

const Admin = () => {
  // Override with admin layout later

  return (
    <div className="text-sm">
      <div className="inline-flex flex-col w-full min-h-[70rem] ml-12 px-24 py-16 bg-[#261000]">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
