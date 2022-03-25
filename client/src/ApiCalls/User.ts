import { gql } from '@apollo/client';

interface User {
  __typename: 'user';
  _id: String;
  userName: String;
  googleId: String;
  role: String;
}

export interface UserData {
  getCurrentUser: User;
}

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      userName
      googleId
      role
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurentUser {
    getCurrentUser {
      _id
      userName
      googleId
      role
    }
  }
`;
