import { gql } from '@apollo/client';


export const LIST_USERS_QUERY = gql`
  query ListUsers($active: Boolean!) {
    listUsers(input: { active: $active }) {
      paginatorInfo {
        total
      }
      data {
        id
        username
        account {
          __typename
        }
      }
    }
  }
`;

export const USER_DETAILS = gql`
    query GetUserDetails($id: Int!) {
    user(id: $id) {
      id
      username
      active
      roles {
        id
        name
      }
      account {
      __typename
      ... on Customer {
        id
        name
      }
      ... on DeliveryAgent {
        id
        name
      }
    }
    }
  }
`;




