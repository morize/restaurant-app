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

type getAllOrdersData = Omit<Order, '__typename' | 'orderItems' | 'extraInfo'>;

type OrderItem = {
  item: Item;
  quantity: number;
};

type OrderItemInput = {
  itemId: string;
  quantity: number;
};

export interface OrdersData {
  getAllOrders: getAllOrdersData[];
  getOrder: Order;
  createOrder: Order;
}

export const GET_ALL_ORDERS = gql`
  query GetAllOders {
    getAllOrders {
      _id
      clientId
      totalPrice
      status
      createdAt
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($orderId: ID!) {
    getOrder(orderId: $orderId) {
      clientId
      orderItems {
        item {
          _id
          name
          description
          price
          type
        }
        quantity
      }
      totalPrice
      extraInfo
      status
      createdAt
    }
  }
`;

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

export const DELETE_ORDER = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId) {
      _id
    }
  }
`;
