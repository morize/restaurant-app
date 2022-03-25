import { gql } from '@apollo/client';

export interface Item {
  __typename: 'item';
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
}

export interface ItemsData {
  getAllItems: Item[];
  getItemsByType: Item[];
  deleteItem: Item;
}

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      _id
      name
      description
      price
      type
    }
  }
`;

export const GET_ITEMS_BY_TYPE = gql`
  query GetItemsByType($type: String!) {
    getItemsByType(type: $type) {
      _id
      name
      description
      price
      type
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $name: String!
    $description: String
    $price: number
    $type: String!
  ) {
    createItem(
      name: $name
      description: $description
      price: $price
      type: $type
    ) {
      _id
      name
      price
      type
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      name
    }
  }
`;
