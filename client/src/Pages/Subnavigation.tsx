import { useNavigate } from 'react-router-dom';

import ListItemButton from '../Components/ListItemButton';

const Subnavigation = () => {
  const navigate = useNavigate();
  
  // Make subnavigation dynamic by checking routename and loading the right subnav items;

  return (
    <div className="sticky flex top-0 w-[400px] h-screen mx-auto">
      <div className="w-1/2 m-auto">
        <h2 className="mb-8 text-[1.6rem]">The Cafeteria</h2>

        <p className="mb-6">Categories</p>
        <ul className="flex flex-col gap-y-5">
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
        </ul>

        <p className="mt-12 mb-6">Filter</p>
        <ul className="flex flex-col gap-y-5">
          <ListItemButton
            label="Breakfast"
            onClick={() => navigate('cafeteria/breakfast')}
          />
          <ListItemButton
            label="Meals"
            onClick={() => navigate('cafeteria/meal')}
          />
        </ul>
      </div>
    </div>
  );
};

export default Subnavigation;