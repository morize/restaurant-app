import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Button';
import {
  GET_ALL_ITEMS,
  DELETE_ITEM,
  ItemsData,
  Item,
} from '../../ApiCalls/Items';

const Items = () => {
  const { loading, data } = useQuery<ItemsData>(GET_ALL_ITEMS);
  const [deleteItem] = useMutation<Item>(DELETE_ITEM, {
    refetchQueries: [{ query: GET_ALL_ITEMS }],
  });
  const navigate = useNavigate();

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="w-[200px]">Name</th>
            <th className="w-[400px]">Description</th>
            <th>Price</th>
            <th>Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            !loading &&
            data.getAllItems.map((item) => (
              <tr className="break-words" key={item._id}>
                <td className="py-12 pr-4">{item.name}</td>
                <td className="py-12 pr-4">{item.description}</td>
                <td className="py-12 pr-4">{item.price}</td>
                <td className="py-12 pr-4">{item.type}</td>
                <td>
                  <button
                    className="flex justify-center items-center w-16 h-8 mb-2 bg-red-700"
                    onClick={() => {
                      deleteItem({
                        variables: {
                          id: item._id,
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="flex justify-center items-center w-16 h-8 bg-blue-900"
                    onClick={() => {
                      window.scrollTo(0,0);
                      navigate(`/app/admin/items/${item._id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Button
        label="Add New Item"
        variant="primary"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          navigate('/app/admin/items/new');
        }}
      />
    </div>
  );
};

export default Items;
