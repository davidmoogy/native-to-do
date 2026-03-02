import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal ,} from 'react-native';
import StartGame from './screens/StartGameScreen';
import Gamescreen from './screens/GameScreen';
export default function App() {

     const [usernumber, setusernumber] = useState();

     function pickednumberhandler(pickednumber){
          setusernumber(pickednumber);
     }

     let screen = <StartGame onpicknumberhandler={pickednumberhandler} />;

     if( usernumber){
       screen = <Gamescreen/>;
     }


    return (
       
    <LinearGradient
       style={styles.container}
       colors={['#ff4d4d', '#ff9999', '#ffd966']}
>
       <ImageBackground source={require('./assets/images/background.png')} resizeMode='cover' style={styles.container} imageStyle={{opacity: 0.15}}>
        {screen}
       </ImageBackground>
    </LinearGradient>
       
    );
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#ff4d4d',
      flex: 1,
     
    }
});


