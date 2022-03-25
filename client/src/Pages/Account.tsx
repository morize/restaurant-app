import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '../Components/Button';
import { ICartItems } from '../Pages/Navigation';

const Account = () => {
  const navigate = useNavigate();
  const { userData } = useOutletContext<ICartItems>();
  return (
    <div>
      {userData && (
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
            navigate('/admin');
          }}
        />
      )}
    </div>
  );
};

export default Account;
