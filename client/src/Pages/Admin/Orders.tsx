import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import {
  DELETE_ORDER,
  GET_ALL_ORDERS,
  OrdersData,
} from '../../ApiCalls/Orders';

import {
  Table,
  TableHeader,
  TableDataCell,
  TableRowCell,
} from '../../Components/Table';

const Orders = () => {
  const { loading, data } = useQuery<OrdersData>(GET_ALL_ORDERS);
  const [deleteOrder] = useMutation<OrdersData>(DELETE_ORDER, {
    refetchQueries: [{ query: GET_ALL_ORDERS }],
  });
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <th>ClientId</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Created At</th>
          <th>Options</th>
        </TableHeader>

        <tbody>
          {data &&
            !loading &&
            data.getAllOrders.map((order) => (
              <TableRowCell key={order._id}>
                <TableDataCell children={<p>{order.clientId}</p>} />
                <TableDataCell children={<p>{order.status}</p>} />
                <TableDataCell children={<p>{order.totalPrice}$</p>} />
                <TableDataCell
                  children={
                    <p>{new Date(parseInt(order.createdAt)).toDateString()}</p>
                  }
                />
                <TableDataCell
                  children={
                    <>
                      <button
                        className="flex justify-center items-center w-16 h-8 mb-2 bg-red-700"
                        onClick={() => {
                          deleteOrder({
                            variables: {
                              orderId: order._id,
                            },
                          });
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="flex justify-center items-center w-16 h-8 bg-blue-900"
                        onClick={() => navigate(`/app/admin/orders/${order._id}`)}
                      >
                        View
                      </button>
                    </>
                  }
                />
              </TableRowCell>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
