import { useQuery } from '@apollo/client';

import { GET_ALL_ITEMS, ItemsData } from '../ApiCalls/Items';
import { config } from '../Utils/config';

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
      <a href={`${config.API_URL}/auth/google`}>Login</a>
      <a href={`${config.API_URL}/auth/logout`}>Logout</a>
    </div>
  );
};

export default Overview;
