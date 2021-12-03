import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { Header } from 'react-native-elements';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default class French extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      definition: '', 
      phonetics: '',
    };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/fr/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
      <View>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Dictionnaire En Ligne',

            style: {
              backgroundColor: 'none',
              fontFamily: 'Rockwell',
              fontSize: 20,
            },
          }}
        />
        <Image
          style={{
            width: 180,
            height: 150,
            borderColor: 'black',
            borderWidth: 4,
            marginTop: 20,
            marginLeft: 100,
          }}
          source={{
            uri:
              'https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/fr.png',
          }}
        />

        <TextInput
          style={styles.searchBox}
          placeholder='Type a word In French!'
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
            Keyboard.dismiss()

          }}>
          <Text style={styles.text1}> Rechercher </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.state.word}</Text>
        <Text style={styles.text}>{this.state.definition}</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 8,
  },
  searchBox: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    fontFamily: 'Rockwell',
    fontSize: 20,
    borderWidth: 4,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  searchButton: {
    width: '60%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'blue',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 30,
color:'red',
  },
});
