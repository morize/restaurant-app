import { useState } from 'react';
import { ICartItem } from '../Pages/Layout';

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
    <li className="flex w-full h-56 mb-12 py-8 px-12 bg-[#412929]">
      <figure className="min-w-[12rem] h-full bg-white">
        <img></img>
      </figure>

      <div className="flex flex-col mx-8">
        <p className="text-2xl mb-6">{name}</p>
        <p className="text-sm">{description}</p>
      </div>

      <div className="flex flex-col min-w-[10rem] items-center justify-center ml-auto">
        <span>{price}$</span>
        <span className="my-4">⭐⭐⭐⭐⭐</span>

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
      </div>
    </li>
  );
};

export default MenuItem;
