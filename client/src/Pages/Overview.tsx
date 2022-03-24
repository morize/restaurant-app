import { useQuery } from '@apollo/client';

import { GET_ALL_ITEMS, ItemsData } from '../ApiCalls/Items';
import { config } from '../Utils/config';

import ListItemButton from '../Components/ListItemButton';

const Overview = () => {
  const { loading, error, data } = useQuery<ItemsData>(GET_ALL_ITEMS);

  error && console.log(error.graphQLErrors[0].extensions.code);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="w-full min-h-[1200px] text-white">
      <div className="sticky top-0 inline-flex flex-col w-3/12 h-full pr-20 ">
        <h2 className="text-4xl text-center">The Cafeteria</h2>
        <p className="mt-4 mb-8 text-center ">Since 1998</p>

        <div className="mt-10 m-auto">
          <p className="mb-6">Categories</p>
          <ul className="flex flex-col gap-y-8 justify-center">
            <ListItemButton label="Breakfast" active={true} />
            <ListItemButton label="Dinner" />
            <ListItemButton label="Beverages" />
            <ListItemButton label="Desserts" />
          </ul>
        </div>
      </div>

      <div className="inline-flex flex-col w-3/4 min-h-full px-24 py-16 bg-[#261000] ">
        <p className="w-full mb-8">
          {data ? data.getAllItems.length : 0} results for Breakfast
        </p>
        <ul>
          {data &&
            data.getAllItems.map(({ _id, name, description, price, type }) => (
              <li
                key={_id}
                className="flex w-full h-56 mb-12 py-8 px-12 bg-[#412929]"
              >
                <figure className="min-w-[12rem] h-full bg-white">
                  <img></img>
                </figure>

                <div className="flex flex-col mx-8">
                  <p className="text-2xl mb-6">{name}</p>
                  <p className="text-sm">{description}</p>
                </div>

                <div className="flex flex-col w-[10rem] items-center justify-center ml-auto">
                  <span>{price}$</span>
                  <span className="my-4">⭐⭐⭐⭐⭐</span>
                  <div className="flex flex-row w-full gap-4">
                    <button className="w-16 h-14 bg-neutral-900">
                      <p className="text-xl">+</p>
                    </button>
                    <button className="w-32 h-14 bg-neutral-900">
                      <p className="text-sm"> More Info</p>
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
