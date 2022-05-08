import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ITEM, ItemsData } from '../../../ApiCalls/Items';

import Input from '../../../Components/Input';
import TextArea from '../../../Components/TextArea';
import Button from '../../../Components/Button';

const CreateItem = () => {
  const [createItem] = useMutation<ItemsData>(CREATE_ITEM);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File>();
  const [type, setType] = useState('Breakfast');

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && setImage(e.target.files[0]);

  return (
    <div>
      <h2 className="text-xl mb-6">Create new item</h2>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          try {
            if (image) {
              const data = new FormData();

              data.append('image', image);
              fetch('https://localhost/images', {
                method: 'POST',
                body: data,
              });

              createItem({
                variables: {
                  name: name,
                  description: description,
                  price: parseFloat(price),
                  type: type,
                  imagePath: image.name,
                },
              });

              alert('Succesfully created new item')
            }
          } catch (e) {
            alert('An error has ocurred');
          }
        }}
      >
        <Input
          label="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <TextArea
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          label="Price"
          required
          type="number"
          min="0"
          step=".01"
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          label="Image"
          required
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => handleImageInput(e)}
          name="image"
        />

        <div className="block my-[24px]">
          <label>Type:</label>
          <select
            className="h-[40px] py-2 px-2 text-black w-full"
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="meal">Meal</option>
            <option value="drink">Drink</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <Button type="submit" label="Add Item" variant="primary" />
      </form>
    </div>
  );
};

export default CreateItem;
