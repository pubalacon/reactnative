
import React from 'react'
import { View,  Button, Text, TouchableOpacity} from 'react-native'

// 1.1) Le texte est cache par la barre du haut, resolvez cela.
// 1.2) Comment peut on forcer l'affichage de NEW TEXT ?

export default class Test extends React.Component {

    constructor (props) {
        super(props)
        this.text_text0 = "props"
        this.state = {
            text_text1: "state",
            text_text2: "",
            text_text3: ""
        }
    }

    _changeText0(newText) {
        this.text_text0 = newText
        this.forceUpdate()
    }

    _changeText1(newText) {
        this.setState({text_text1:newText})
    }

    _addToText = () => {
        this.setState({text_text2:this.state.text_text1 + " with callback"})
    }

    _changeText2(newText) {
        this.setState({text_text1:newText}, this._addToText)
    }

    _changeText3() {
        this.setState({text_text3:this.state.text_text2})
    }

    render() {
        return(
            /*
            <View>
                <Text style={styles.test_text}>{this.text_text0}</Text>
                <Button 
                    title="Press to Change Props"
                    onPress={() => this._changeText0("props changed")}
                />

               <Text style={styles.test_text}>{this.state.text_text1}</Text>
                <Button 
                    title="Press to Change State"
                    onPress={() => this._changeText1("state changed")}
                />

               <Text style={styles.test_text}>{this.state.text_text1}</Text>
                <Button 
                    title="Press to Change State with Callback"
                    onPress={ () => this._changeText2("state changed") }
                />

               <Text style={styles.test_text}>{this.state.text_text3}</Text>
                <Button 
                    title="Press to see state.text_text3"
                    onPress={ () => this._changeText3() }
                />
            </View>
            */
            <TouchableOpacity 
                style={styles.container}
                onPress={() => this._changeText1("state changed")}
            >
            <Text style={styles.test_text}>{this.state.text_text1}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = {
    container: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    test_text: {
    }
  }
  