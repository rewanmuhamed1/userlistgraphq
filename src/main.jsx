import { StrictMode, useState, createContext, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { TokenContext } from './context.jsx'
import useApolloClient from './apolloClient.js';



const Root = () => {
  const client = useApolloClient();

  const [userToken, setUserToken] = useState(localStorage.getItem('usertoken'));
  //const getuserid = localStorage.getItem('usertoken');
  console.log('main usertoken', userToken);



  return (

    <StrictMode>
     
        <TokenContext.Provider value={{ userToken, setUserToken }}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </ApolloProvider>
        </TokenContext.Provider>
    
    </StrictMode>

  );
};

createRoot(document.getElementById('root')).render(<Root />);
