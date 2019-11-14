import React from 'react'
import { Text, View, FlatList, StyleSheet, TextInput, Button, Alert } from 'react-native'


// 1.1) Le texte est cache par la barre du haut, resolvez cela.
// 1.2) Comment peut on forcer l'affichage de NEW TEXT ?

export default class NoteListe extends React.Component {

    constructor(props) {
        super(props)
        this.note = ""
        this.txt = ""
        this.lastId = 0
        this.state = {
            notes: [],
            lastId: 0,
        }
    }

    _noteInputChanged(text) {
        //console.log(this.state.lastId)
        this.note = {id:this.lastId.toString(), note:text}
        this.txt = text
    }
    
    _noteInputSubmit() {
        //
        if (this.txt.length > 0)
        {
            this.lastId++
            this.setState( {
                notes: [...this.state.notes, {id:this.lastId.toString(), note:this.txt}],
                lastId: this.lastId,
                }, () => {
                    this.txt = ""
                    this.textinput.clear()
                }
            )
        }
        else
            Alert.alert("ECRIIIIS")
    }

    render() {
        return (
            
            <View style={styles.container}>
                <TextInput
                    ref={input => { this.textinput = input }}
                    style={styles.NoteInput}
                    placeholder='Entrez une nouvelle note'
                    onChangeText={(text) => this._noteInputChanged(text)}
                    onSubmitEditing={() => this._noteInputSubmit()}
                />
                <Button
                    title="Press to Add Note"
                    onPress={() => this._noteInputSubmit()}
                />

                <FlatList
                    style = {styles.NoteList}
                    data = { this.state.notes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Text style={styles.note}>{item.id} - {item.note}</Text>
                    )}
                />
            </View>

        )
    }
}

const styles = {
    container: {
        flex:1
    },
    NoteInput: {
        marginTop: 42,
        margin: 5,
        borderWidth:1,
        borderColor: 'black'
    },
    NoteList: {
        margin: 5
    },
    note: {
        fontSize:16
    }
  }

