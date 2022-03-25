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
