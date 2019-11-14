import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

class Note extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
    }

    _deleteNote(line) {
        const notesIndex = state.notes.findIndex(item => item.id === line.id)
        if (notesIndex !== -1) {
          // La note est bien dans le tableau, on le supprime de la liste
          nextState = {
            ...state,
            notes: state.notes.filter( (item, index) => index !== notesIndex)
          }
        }
        this.setState(nextState || state)
      }

    render () {

        const { line } = this.props
        
        console.log(this.state)
        return(
            <TouchableOpacity
                onPress={() => this._deleteNote(line)}
            >
                <Text style={styles.note}>{line.id} - {line.note}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = {
    note: {
        fontSize:16
    }
  }

export default Note