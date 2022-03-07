import { gql } from '@apollo/client';

interface Item {
  __typename: 'item';
  _id: string;
  name: string;
}

export interface ItemsData {
  items: Item[];
}

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    items {
      _id
      name
    }
  }
`;
