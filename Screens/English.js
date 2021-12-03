import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { Header } from 'react-native-elements';
 import * as Speech from 'expo-speech'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner } from 'expo-ads-admob';

export default class English extends React.Component {
  constructor() {
    super();
    this.state = {
      text:'',
      word: '',
      definition: '', 
      phonetics: '',
     
    };
    
  }
    sound=()=>{

    var writtenWord = this.state.text;
    writtenWord ? Speech.speak(writtenWord) : Alert.alert('The box can not be left empty. Please write something in the box, then click on the button.')
  }

  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
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
          backgroundColor={'none'}
          centerComponent={{
            text: 'Online Dictionary App',

            style: {
              backgroundColor: 'red',
              color:'blue',
              fontFamily: 'Rockwell',
              fontSize: 21,
            
            },
          }}
        />

<AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-7017174341287348/4539480506" 

  />


        <Image
          style={{
            width: 180,
            height: 130,
            borderColor: 'black',
            borderWidth: 4,
            marginTop: 20,
            marginLeft: 100,
          }}
          source={{
            uri:
              'https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/us.png',
          }}
        />

        <TextInput
          style={styles.searchBox}
          placeholder='Type a word In English!'
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
         
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
            this.sound()
            Keyboard.dismiss()

          
          }}>
           
          <Text style={styles.text1}> Search </Text>
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
    backgroundColor: 'blue', 
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
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'red',
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
color:'white',
  },
});
