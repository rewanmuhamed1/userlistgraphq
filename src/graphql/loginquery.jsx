import { gql } from '@apollo/client';


export const POST_LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;






