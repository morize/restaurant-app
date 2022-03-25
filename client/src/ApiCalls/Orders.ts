import { gql } from '@apollo/client';

import { Item } from './Items';

interface Order {
  __typename: 'order';
  _id: string;
  clientId: string;
  orderItems: [OrderItem];
  totalPrice: number;
  extraInfo: string;
  status: string;
  createdAt: string;
}

type OrderItem = {
  item: Item;
  quantity: number;
};

type OrderItemInput = {
  itemId: string;
  quantity: number;
};

export interface OrdersData {
  getAllOrders: Order[];
  createOrder: Order;
}

export const CREATE_ORDER = gql`
  mutation CreateOrder($orderItems: [OrderItemInput]!, $extraInfo: String) {
    createOrder(orderItems: $orderItems, extraInfo: $extraInfo) {
      status
      orderItems {
        item {
          name
        }
      }
    }
  }
`;
