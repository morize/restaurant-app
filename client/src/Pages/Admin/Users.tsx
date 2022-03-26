import { useQuery } from '@apollo/client';

import {
  Table,
  TableHeader,
  TableDataCell,
  TableRowCell,
} from '../../Components/Table';
import { GET_ALL_USERS, UserData } from '../../ApiCalls/User';

const Users = () => {
  const { data, loading } = useQuery<UserData>(GET_ALL_USERS);

  return (
    <div>
      {data && !loading ? (
        <Table>
          <TableHeader>
            <th>Username</th>
            <th>GoogleID</th>
            <th>Role</th>
            <th>Options</th>
          </TableHeader>

          <tbody>
            {data.getAllUsers.map((user) => (
              <TableRowCell key={user._id}>
                <TableDataCell children={<p>{user.userName}</p>} />

                <TableDataCell children={<p>{user.googleId}</p>} />

                <TableDataCell children={<p>{user.role}</p>} />
              </TableRowCell>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Users;
