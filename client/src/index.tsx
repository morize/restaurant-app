import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';

import App from './App';
import { config } from './Utils/config';

const httpLink = createHttpLink({
  uri: `${config.API_URL}/graphql`,
  credentials: 'include',
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get('currentUserId');
    console.log(authHeader);
    return response;
  });
});

const apolloClient = new ApolloClient({
  link: afterwareLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: 'HotelCateringApp',
  credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
