import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_CURRENT_USER, UserData } from '../ApiCalls/User';

import Button from '../Components/Button';

const Account = () => {
  const navigate = useNavigate();
  const { data: userData, loading } = useQuery<UserData>(GET_CURRENT_USER);

  return (
    <div>
      {userData && !loading && (
        <div className="text-white">
          <p>Username: {userData.getCurrentUser.userName}</p>
          <p>Role: {userData.getCurrentUser.role}</p>
        </div>
      )}
      {userData?.getCurrentUser.role === 'admin' && (
        <Button
          label="Go to admin portal"
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin', { state: userData });
          }}
        />
      )}
    </div>
  );
};

export default Account;
