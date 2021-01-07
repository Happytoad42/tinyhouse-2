import React from 'react';
import ReactDOM from 'react-dom';
import { Listings } from './sections';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({ uri: '/api' });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Listings title='Tinyhouse Listings' />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
