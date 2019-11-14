import React from 'react'
import { View, Button, TextInput, StyleSheet, Text } from 'react-native'
import gql from 'graphql-tag'
import { ApolloProvider, graphql, Mutation } from 'react-apollo'

export default class CreateNote extends React.Component {

  constructor(props) {
    super(props)
    this.Txt = ""
  }

  render() {
    return (
      <View style={styles.center}>
        <Mutation mutation={INSERT_NOTE}>
          {(INSERT_NOTEMutation, { data }) => (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.Txt = text}
                placeholder="texte de la note"
              />
              <Button
                onPress={() => {
                  INSERT_NOTEMutation({
                    variables: {
                      texte: this.Txt
                    }
                  })
                    .then(res => res)
                    .catch(err => <Text>{err}</Text>);
                  this.Txt = "";
                }}
                title="Add Note"
              />
            </View>
          )}
        </Mutation>
      </View>
    );
  }
}

const INSERT_NOTE = gql`
  mutation addNote($texte: String!) {
    createNote(data: { text: $texte }) {
        id
        text
    }
  }
`;

/*
refetchQueries={[{ query: FETCH_NOTES}]}
*/

/*
const INSERT_NOTE = gql`
mutation ($InputText: String!){
    createNote(
      data: {
          text: $InputText
      }
    ) {
      id
      text
    }
  }
`;
*/

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})