import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ITEMS_BY_TYPE, ItemsData } from '../ApiCalls/Items';

import MenuItem from '../Components/MenuItem';
import ListItemButton from '../Components/ListItemButton';
import { ICartItems } from '../Pages/Layout';

const Overview = () => {
  const [category, setCategory] = useState('breakfast');

  const { loading, error, data } = useQuery<ItemsData>(GET_ITEMS_BY_TYPE, {
    variables: { type: category },
  });

  const { cartItems, addToCart } = useOutletContext<ICartItems>();

  return (
    <div className="w-full h-auto text-white text-sm">
      <div className="sticky top-14 inline-flex flex-col w-1/5 h-auto pr-20">
        <h2 className="text-3xl text-center">The Cafeteria</h2>
        <p className="mt-4 mb-8 text-center ">Since 1998</p>

        <div className="mt-10 m-auto">
          <p className="mb-6">Categories</p>
          <ul className="flex flex-col gap-y-8 justify-center">
            <ListItemButton
              label="Breakfast"
              active={category === 'breakfast'}
              onClick={(e) =>
                category !== 'breakfast' && setCategory('breakfast')
              }
            />
            <ListItemButton
              label="Meals"
              active={category === 'meal'}
              onClick={() => category !== 'meal' && setCategory('meal')}
            />
            <ListItemButton
              label="Drinks"
              active={category === 'drink'}
              onClick={() => category !== 'drink' && setCategory('drink')}
            />
            <ListItemButton
              label="Desserts"
              active={category === 'dessert'}
              onClick={() => category !== 'dessert' && setCategory('dessert')}
            />
          </ul>
        </div>
      </div>

      <div className="inline-flex flex-col w-3/4 min-h-[70rem] ml-12 px-24 py-16 bg-[#261000]">
        {!loading ? (
          <>
            <p className="w-full mb-8">
              {data ? data.getItemsByType.length : 0} results found for{' '}
              <span className="capitalize">{category}</span>
            </p>
            <ul>
              {data &&
                data.getItemsByType.map(({ _id, name, description, price }) => (
                  <MenuItem
                    id={_id}
                    name={name}
                    description={description}
                    price={price}
                    addToCart={addToCart}
                    key={_id}
                    initialQuantity={
                      // do with redux instead, this loops through your cart for each fetched card item
                      cartItems.find((cartItem) => cartItem.id === _id)
                        ?.quantity
                    }
                  />
                ))}
            </ul>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
