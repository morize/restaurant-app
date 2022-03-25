import { useLocation } from 'react-router-dom';
import { ICartItem } from '../Pages/Layout';
import Button from '../Components/Button';

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state as ICartItem[];

  return (
    <div className="text-white">
      {cartItems &&
        cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <p>{cartItem.name}</p>
            <p>{cartItem.price}</p>
          </div>
        ))}
      <Button label="Proceed to check out" variant="secondary" />
    </div>
  );
};

export default Checkout;
