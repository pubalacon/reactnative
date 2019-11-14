import React from 'react'
import { View, StyleSheet, Text, Button, TextInput, FlatList, Alert } from 'react-native'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

export default class User extends React.Component {
  render() {
    return (
      <Query
        query={FETCH_NOTES}
      >
        {
          ({ data, error, loading }) => {
            console.log(data)
            if (loading) return (<View><Text>LOADING LOADING LOADING</Text></View>)
            if (!data.notes) return null;
            return (
              <View style={styles.main}>
                <FlatList
                  data={data.notes}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <Text>{item.text}</Text>}
                />
              </View>
            )
          }
        }
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

const FETCH_NOTES = gql`
query {
    notes {
        id
        text
      }
    }
`;

/*
mutation {
    createNote(
      data: {
          text: "a new note"
      })
  {
      id
      text
    }
  }
*/

/*
  mutation ($text: String!){
    insert_todos (
      objects: [{
        title: $text
      }]
    ){
    returning {
        id
        text
      }
    }
  }
  */