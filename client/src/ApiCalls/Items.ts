import { gql } from '@apollo/client';

export interface Item {
  __typename: 'item';
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  imagePath: string;
}

export interface ItemsData {
  getItem: Item;
  getAllItems: Item[];
  getItemsByType: Item[];
  updateItem: Item;
  deleteItem: Item;
}

export const GET_ITEM_BY_ID = gql`
  query GetItemById($id: ID!) {
    getItem(id: $id) {
      name
      description
      price
      type
      imagePath
    }
  }
`;

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      _id
      name
      description
      price
      type
      imagePath
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
      imagePath
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem(
    $name: String!
    $description: String
    $price: Float!
    $type: String!
    $imagePath: String!
  ) {
    createItem(
      name: $name
      description: $description
      price: $price
      type: $type
      imagePath: $imagePath
    ) {
      _id
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $type: String
    $imagePath: String
  ) {
    updateItem(
      id: $id
      name: $name
      description: $description
      price: $price
      type: $type
      imagePath: $imagePath
    ) {
      name
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
