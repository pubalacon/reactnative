// AVEC GRAPHQL & PRISMA:
// npm install expo-cli
// faire un compte sur prisma
// expo init MyServerName
//npm install --save apollo-client react-apollo apollo-cache-inmemory apollo-link-http graphql graphql-tag

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './apollo';
import { View, Text } from 'react-native'
//import User from './Components/User'
import CreateNote from './Components/AddButton'

export default class App extends React.Component {
  state = {
    client: null
  }

  async componentDidMount() {
    const token = "tokenID"
    const client = makeApolloClient(token);
    this.setState({ client });
  }

  render() {
    if (!this.state.client) {
      console.log("Apollo client KO")
      return (
        <View><Text>Apollo client KO</Text></View>
      )
    }
    else {
      console.log("Apollo client OK")
      return (
        <ApolloProvider client={this.state.client}>
          <CreateNote></CreateNote>
        </ApolloProvider>
      )
    }
  }
};





