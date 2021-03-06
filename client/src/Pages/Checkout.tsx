import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Button from '../Components/Button';
import TextArea from '../Components/TextArea';
import { CREATE_ORDER, OrdersData } from '../ApiCalls/Orders';
import { ICartItem } from '../Pages/Navigation';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state as ICartItem[];

  const [createOrder] = useMutation<OrdersData>(CREATE_ORDER);

  const [extraInfo, setExtraInfo] = useState('');

  const getTotalPrice = () => {
    let totalPrice = 0;

    cartItems.map(
      (cartItem) => (totalPrice += cartItem.quantity * cartItem.price)
    );

    return totalPrice.toFixed(2);
  };

  return (
    // should be table
    <div className="flex flex-col w-[800px] mx-auto text-white">
      <div className="flex justify-between mb-4">
        <p>Name</p>
        <p>
          <span className="mr-10">Quantity</span>Price
        </p>
      </div>

      {cartItems &&
        cartItems.map((cartItem) => (
          <div className="flex w-full justify-between" key={cartItem.id}>
            <p>{cartItem.name}</p>
            <p>
              <span className="mr-16">{cartItem.quantity}</span>
              {cartItem.price}$
            </p>
          </div>
        ))}

      <div className="flex w-full justify-between mt-4 text-xl">
        <p>Total</p>
        <p>{getTotalPrice()}$</p>
      </div>

      <TextArea
        className="text-black"
        label='Extra Info'
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />

      <Button
        type="submit"
        label="Proceed to check out"
        variant="secondary"
        onClick={(e) => {
          e.preventDefault();

          const itemsToAdd = cartItems.map((cartItem) => {
            return { itemId: cartItem.id, quantity: cartItem.quantity };
          });

          createOrder({
            variables: { orderItems: itemsToAdd, extraInfo: extraInfo },
          });

          alert('Your order has been placed')
        }}
      />

      <Button label="Back to cafeteria" variant='danger' onClick={()=>{
        navigate('/app/cafeteria/breakfast')
      }}/>
    </div>
  );
};

export default Checkout;
