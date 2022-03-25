import { useParams } from 'react-router-dom';

const UpdateItem = () => {
  let { id } = useParams();

  return <div>{id}</div>;
};

export default UpdateItem;
