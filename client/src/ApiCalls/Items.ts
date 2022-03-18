import { gql } from '@apollo/client';

interface Item {
  __typename: 'item';
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
}

export interface ItemsData {
  getAllItems: Item[];
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
