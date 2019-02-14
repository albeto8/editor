import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SplitScreen from './SplitScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <SplitScreen />
      </ApolloProvider>
    );
  }
}

export default App;
