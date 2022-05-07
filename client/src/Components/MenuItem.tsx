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
        <img className="w-[200px] h-[140px] m-auto" alt="placeholder" src="https:/localhost/images/default.jpg"/>
      </figure>

      <div className="mx-8 px-4 w-1/2">
        <p className="text-2xl mb-6">{name}</p>
        <p className="text-sm">{description}</p>
      </div>

      <div className="w-1/5 ml-auto">
        <div className="flex flex-row w-full gap-4">
          <button
            className="w-14 h-12 bg-[#8B3939]"
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
            <p className="text-base">+</p>
          </button>
          <p className="w-5 m-auto">{quantity}</p>
          <button
            className="w-14 h-12 bg-[#8B3939]"
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
            <p className="text-xs">-</p>
          </button>
        </div>
        <p>{price}$</p>
        <span className="my-4">⭐⭐⭐⭐⭐</span>
      </div>
    </li>
  );
};

export default MenuItem;
