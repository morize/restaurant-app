import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Button from '../Components/Button';
import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

const Account = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<UserData>(GET_CURRENT_USER);

  return (
    <div>
      {data && (
        <div className="text-white">
          <p>Username: {data.getCurrentUser.userName}</p>
          <p>Role: {data.getCurrentUser.role}</p>
        </div>
      )}
      {data?.getCurrentUser.role === 'admin' && (
        <Button
          label="Go to admin portal"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin');
          }}
        />
      )}
    </div>
  );
};

export default Account;
