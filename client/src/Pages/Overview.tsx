import { useQuery } from '@apollo/client';

import { GET_ALL_ITEMS, ItemsData } from '../ApiCalls/Items';

const Overview = () => {
  const { loading, error, data } = useQuery<ItemsData>(GET_ALL_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data &&
        data.items.map(({ _id, name }) => (
          <p key={_id}>
            id: {_id}
            name: {name}
          </p>
        ))}
    </div>
  );
};

export default Overview;
