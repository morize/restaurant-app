import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import {
  GET_ITEM_BY_ID,
  UPDATE_ITEM,
  ItemsData,
} from '../../../ApiCalls/Items';

import Input from '../../../Components/Input';
import TextArea from '../../../Components/TextArea';
import Button from '../../../Components/Button';

const EditItem = () => {
  let { id: itemId } = useParams();

  const { loading, data } = useQuery<ItemsData>(GET_ITEM_BY_ID, {
    variables: { id: itemId },
  });
  const [updateItem] = useMutation<ItemsData>(UPDATE_ITEM);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (data && !loading) {
      setName(data.getItem.name);
      setDescription(data.getItem.description);
      setPrice(data.getItem.price.toString());
      setType(data.getItem.type);
    }
  }, [data, loading]);

  return (
    <div>
      id: {itemId}
      {data && (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            updateItem({
              variables: {
                id: itemId,
                name: name,
                description: description,
                price: parseFloat(price),
                type: type,
              },
            });
          }}
        >
          <Input
            label="Name"
            id="name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            label="Description"
            defaultValue={description}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Price"
            type="number"
            min="0"
            step=".01"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="block my-[24px]">
            <label>Type:</label>
            <select
              className="h-[40px] py-2 px-2 text-black w-full"
              value={type}
              onChange={(e) => {
                e.preventDefault();
                setType(e.target.value);
              }}
            >
              <option value="breakfast">Breakfast</option>
              <option value="meal">Meal</option>
              <option value="drink">Drink</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>

          <Button type="submit" label="Submit" variant="primary" />
        </form>
      )}
    </div>
  );
};

export default EditItem;
