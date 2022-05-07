import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';
import { GET_ITEMS_BY_TYPE, ItemsData } from '../ApiCalls/Items';

import MenuItem from '../Components/MenuItem';
import { ICartItems } from './Navigation';

const Overview = () => {
  const { category } = useParams();
  const { loading, data } = useQuery<ItemsData>(GET_ITEMS_BY_TYPE, {
    variables: { type: category },
  });

  const { cartItems, addToCart } = useOutletContext<ICartItems>();

  return (
    <div className="text-white text-sm">
      {!loading ? (
        <>
          <p className="w-full mb-8">
            {data ? data.getItemsByType.length : 0} results fsound for{' '}
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
                    cartItems.find((cartItem) => cartItem.id === _id)?.quantity
                  }
                />
              ))}
          </ul>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Overview;
