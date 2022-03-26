import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableHeader,
  TableRowCell,
  TableDataCell,
} from '../../../Components/Table';
import { GET_ORDER_BY_ID, OrdersData } from '../../../ApiCalls/Orders';

const ViewOrder = () => {
  const { id: orderId } = useParams();
  const { loading, data } = useQuery<OrdersData>(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
  });
  console.log(data?.getOrder);
  return (
    <div>
      {data && !loading ? (
        <>
          <h2 className="mb-4 text-xl">Order:</h2>
          <Table>
            <TableHeader>
              <th>Client ID</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Info</th>
              <th>Created At</th>
            </TableHeader>
            
            <tbody>
              <TableRowCell>
                <TableDataCell children={<p>{data.getOrder.clientId}</p>} />
                <TableDataCell children={<p>{data.getOrder.status}</p>} />
                <TableDataCell children={<p>{data.getOrder.totalPrice}$</p>} />
                <TableDataCell children={<p>{data.getOrder.extraInfo}</p>} />
                <TableDataCell children={<p>{data.getOrder.createdAt}</p>} />
              </TableRowCell>
            </tbody>
          </Table>

        
          <h2 className="my-4 text-xl">Items within Order:</h2>
          <Table>
            <TableHeader>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Type</th>
              <th>Quantity</th>
            </TableHeader>

            <tbody>
              {data.getOrder.orderItems.map((item) => (
                <TableRowCell key={item.item._id}>
                  <TableDataCell children={<p>{item.item.name}</p>} />
                  <TableDataCell children={<p>{item.item.description}</p>} />
                  <TableDataCell children={<p>{item.item.price}$</p>} />
                  <TableDataCell children={<p>{item.item.type}</p>} />
                  <TableDataCell children={<p>{item.quantity}</p>} />
                </TableRowCell>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default ViewOrder;
