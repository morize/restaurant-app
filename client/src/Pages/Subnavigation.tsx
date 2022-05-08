import { useNavigate, useLocation } from 'react-router-dom';

import ListItemButton from '../Components/ListItemButton';

const Subnavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageName = location.pathname.split('/').filter((value) => value!)[1];

  // Make subnavigation dynamic by checking routename and loading the right subnav items;
  return (
    <div className="sticky flex flex-col top-0 w-[320px] ml-[60px] h-screen">
      <div className="m-auto">
        <h2 className="mb-8 text-[1.5rem]">The Cafeteria</h2>

        <p className="mb-6">Categories</p>
        <ul className="flex flex-col gap-y-5">
          {pageName === 'cafeteria' ? (
            <>
              <ListItemButton
                label="Breakfast"
                onClick={() => navigate('cafeteria/breakfast')}
              />
              <ListItemButton
                label="Meals"
                onClick={() => navigate('cafeteria/meal')}
              />
              <ListItemButton
                label="Drinks"
                onClick={() => navigate('cafeteria/drink')}
              />
              <ListItemButton
                label="Desserts"
                onClick={() => navigate('cafeteria/dessert')}
              />
            </>
          ) : (
            <>
              <ListItemButton
                label="Items"
                onClick={() => navigate('admin/items')}
              />
              <ListItemButton
                label="Orders"
                onClick={() => navigate('admin/orders')}
              />
              <ListItemButton
                label="Users"
                onClick={() => navigate('admin/users')}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Subnavigation;
