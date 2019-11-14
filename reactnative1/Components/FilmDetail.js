// Components/FilmDetail.js

import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { StyleSheet, ScrollView, View, ActivityIndicator, Text, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'

import { connect } from 'react-redux'

// Ce code n'est pas utile, sauf si necessaire d'optimiser le code
/*
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}
*/

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }

  componentDidMount() {
    //console.log("Component FilmDetail monté")
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  componentDidUpdate() {
    //console.log("Component FilmDetail maj")
  }

  _isRealValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

  }

  _toggleFavorite() {
    // Définition de notre action ici
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  _displayCollection(film) {
    /*
    "belongs_to_collection": Object {
      "backdrop_path": "/d8duYyyC9J5T825Hg7grmaabfxQ.jpg",
      "id": 10,
      "name": "Star Wars - Saga",
      "poster_path": "/dXYuoRx7o7OxssIhznx3AJbgKHe.jpg",
    }
    */
    if(this._isRealValue(film.belongs_to_collection)) {
      return (
        <View>
          <Image
            style={styles.imageCollection}
            source={{uri: getImageFromApi(film.belongs_to_collection.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.belongs_to_collection.name}</Text>
        </View>
          )
    }
  }

  _displayFilm() {

    const { film } = this.state

    //if (this.state.film != undefined) {
    if (film != undefined) {
      var genres = "", producteurs = "", langues = "", payss = "",
          nbg = film.genres.length, 
          nbp = film.production_companies.length,
          nbl = film.spoken_languages.length,
          nbc = film.production_countries.length

      genres = nbg>0 ? film.genres.map((genre,i) => {
        return genre.name;
      }).join("/") : "NC"

      producteurs = nbp>0 ? film.production_companies.map((producteur,i) => {
        return producteur.name;
      }).join("/") : "NC"

      langues = nbl>0 ? film.spoken_languages.map((langue,i) => {
        return langue.name;
      }).join("/") : "NC"

      payss = nbc>0 ? film.production_countries.map((pays,i) => {
        return pays.name;
      }).join("/") : "NC"
      
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            //source={{uri: getImageFromApi(this.state.film.poster_path)}}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />

          <Text style={styles.title_text}>{film.title}</Text>
          {/* <Button title="Favoris" onPress={() => this._toggleFavorite()}/> */}
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>

          <Text style={styles.subtitle_text}>{film.tagline}</Text>

          <Text style={styles.description_text}>{film.overview}</Text>

          <Text style={styles.default_text}>Sorti le {moment(film.release_date).format("DD/MM/YYYY")}</Text>
          <Text style={styles.default_text}>Note: {film.vote_average}</Text>
          <Text style={styles.default_text}>Nombre de votes: {film.vote_count}</Text>
          <Text style={styles.default_text}>Titre original: {film.original_title}</Text>
          <Text style={styles.default_text}>Budget: {numeral(film.budget).value()} $ - Revenus: {numeral(this.state.film.revenue).value()} $</Text>
          <Text style={styles.default_text}>Genre(s): {genres}</Text>
          <Text style={styles.default_text}>Producteur(s): {producteurs}</Text>
          <Text style={styles.default_text}>Pays Tournage: {payss}</Text>
          <Text style={styles.default_text}>Langue(s): {langues}</Text>

          { this._displayCollection(film) }
        </ScrollView>
      )
    }
  }

  render() {
    //console.log(this.props)
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  },
  image: {
    height: 169,
    margin: 5
  },
  imageCollection: {
    height: 69,
    margin: 5
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  subtitle_text: {
    fontSize: 25,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
    marginBottom: 8,
    color: '#0a0a0a',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

const mapStateToProps = (state) => {
  //return state
  return {
    favoritesFilm: state.favoritesFilm
  }
}

//export default FilmDetail
//export default connect()(FilmDetail)
export default connect(mapStateToProps)(FilmDetail)
//export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail) // Ce code n'est pas utile, sauf si necessaire d'optimiser le code, car le connect le prend en charge tout seul