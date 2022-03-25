import { useLocation } from 'react-router-dom';

import { UserData } from '../ApiCalls/User';

const Admin = () => {
  const location = useLocation();
  const userData = location.state as UserData[];

  return <div>a</div>;
};

export default Admin;
