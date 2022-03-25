import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Button from '../Components/Button';
import { CREATE_ORDER, OrdersData } from '../ApiCalls/Orders';
import { ICartItem } from '../Pages/Layout';

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state as ICartItem[];

  const [createOrder, { data, loading, error }] =
    useMutation<OrdersData>(CREATE_ORDER);

  return (
    <div className="flex flex-col text-white">
      {cartItems &&
        cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <span>{cartItem.name}</span>
            <span>{cartItem.price}</span>
          </div>
        ))}
      <label>Extra Info</label>
      <textarea />
      <Button
        type="submit"
        label="Proceed to check out"
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();
          const itemsToAdd = cartItems.map((cartItem) => {
            return { itemId: cartItem.id, quantity: 3 };
          });

          console.log(itemsToAdd);

          createOrder({
            variables: { orderItems: itemsToAdd, extraInfo: 'yo' },
          });
        }}
      />
    </div>
  );
};

export default Checkout;
