import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import Mainbutton from '../components/Mainbutton';
import { useState } from 'react';

function StartGame({ onpicknumberhandler }) {

  const [enterednumber, setenterednumber] = useState('');

  function numberinputhandler(enteredtext) {
    setenterednumber(enteredtext);
  }

  function confirmButton() {
    const chosennumber = parseInt(enterednumber);

    if (isNaN(chosennumber) || chosennumber <= 0 || chosennumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be between 1 and 99.',
        [{ text: 'OK' }]
      );
      return;
    }

    onpicknumberhandler(chosennumber);
  }

  function resetButton() {
    setenterednumber('');
  }

  return (
    <View style={styles.inputcontainer}>
      <TextInput
        style={styles.numberinput}
        maxLength={2}
        keyboardType='number-pad'
        autoCorrect={false}
        value={enterednumber}
        onChangeText={numberinputhandler}
      />
      <View style={styles.buttonscontainer}>
        <Mainbutton onPress={resetButton}>Reset</Mainbutton>
        <Mainbutton onPress={confirmButton}>Confirm</Mainbutton>
      </View>
    </View>
  );
}

export default StartGame;

const styles = StyleSheet.create({
  inputcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: '#c74747',
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
  numberinput: {
    height: 55,
    width: 50,
    fontSize: 32,
    borderBottomColor: 'yellow',
    borderBottomWidth: 2,
    color: 'yellow',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonscontainer: {
    flexDirection: 'row',
  }
});