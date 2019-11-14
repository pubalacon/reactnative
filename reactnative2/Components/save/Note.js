import React from 'react'
import { Text, View } from 'react-native'

export default class Note extends React.Component {

    render () {

        const { line } = this.props
        
        return(
            <View>
                <Text style={styles.note}>{line.id} - {line.note}</Text>
            </View>
        )
    }
}

const styles = {
    note: {
        fontSize:16
    }
  }

