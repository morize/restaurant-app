import { useState } from 'react';
import { ICartItem } from '../Pages/Navigation';

interface IMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  addToCart: (cartItem: ICartItem) => void;
  initialQuantity?: number;
}

const MenuItem = ({
  id,
  name,
  description,
  price,
  addToCart,
  initialQuantity = 0,
}: IMenuItem) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  return (
    <li className="flex h-56 mb-12 px-8 items-center justify-around bg-[#412929]">
      <figure className="w-1/4 h-auto">
        <img
          className="w-[200px] h-[140px] m-auto"
          alt="placeholder"
          src="https:/localhost/images/default.jpg"
        />
      </figure>

      <div className="mx-8 px-4 w-1/2">
        <p className="text-2xl mb-4">{name}</p>
        <p className="text-[0.8rem]">{description}</p>
      </div>

      <div className="w-1/5 ml-auto">
        <p className="mb-4 text-center text-lg">{price}$</p>
        <div className="flex flex-row items-center justify-center w-full gap-4">
          <button
            className="w-10 h-10 bg-[#8B3939]"
            onClick={() => {
              setQuantity(quantity + 1);
              addToCart({
                id: id,
                name: name,
                price: price,
                quantity: quantity + 1,
              });
            }}
          >
            +
          </button>
          <p className='w-2'>{quantity}</p>
          <button
            className="w-10 h-10 bg-[#8B3939]"
            onClick={() => {
              if (quantity !== 0) {
                setQuantity(quantity - 1);
                addToCart({
                  id: id,
                  name: name,
                  price: price,
                  quantity: quantity - 1,
                });
              }
            }}
          >
            -
          </button>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
