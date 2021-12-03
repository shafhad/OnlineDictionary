import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs' 
import Vihan from './Screens/English'
import Vihans from './Screens/Spanish'
import Vihanss from './Screens/Italian'
import Vihansss from './Screens/Hindi'
import Vihanssss from './Screens/Germany'
import Vihansssss from './Screens/French'
import Game from './Screens/Game'
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default class App extends React.Component {
constructor(props){
  super(props);

 
}

  render(){
    return(

         <View style={styles.container}>
          

      <AppContainer />
      
     
      </View> 
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  English: Vihan,
  Spanish: Vihans,
  Italian:Vihanss,
Hindi: Vihansss,
Germany: Vihanssss,
French: Vihansssss,
Game:Game

},

  )

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    padding: 8,
  },
});