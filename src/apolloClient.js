// src/hooks/useApolloClient.js
import { useContext,useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { TokenContext } from './context';

const useApolloClient = () => {

  //const userToken = useContext(TokenContext);
   

  //console.log('apollo usertoken',userToken);
  // Create an error link to handle network errors
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
  
    // Create an http link with headers
    const httpLink = new HttpLink({
      uri: 'http://192.168.1.100:8000/graphql', // Adjust the URI to your GraphQL endpoint
      headers: {
        authorization: localStorage.getItem('usertoken') ? `Bearer ${localStorage.getItem('usertoken')}` : "", // Set the authorization header
      },
    });

    // Create a link chain combining error handling and http link
    const link = ApolloLink.from([errorLink, httpLink]);

    // Return a new Apollo Client instance
    return new ApolloClient({
      link: link,
      cache: new InMemoryCache({ dataIdFromObject: o => false }),
    });


 
};
export default useApolloClient;
