import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter} from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ApolloProvider>
);