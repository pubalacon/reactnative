// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text } from 'react-native'

import FilmList from './FilmList'

import { connect } from 'react-redux'

class Favorites extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false
    }
  }

  render() {
    console.log("entering favorites");
    return (
      <Text>Mes Favoris</Text>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})


const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

//export default Favorites
export default connect(mapStateToProps)(FilmList)