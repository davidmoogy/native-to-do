import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';

export default function App() {

  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function goalInputHandler(text) {
    setEnteredGoalText(text);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;

    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), text: enteredGoalText }
    ]);
    setEnteredGoalText('');
    setModalVisible(false); 
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentGoals => currentGoals.filter(goal => goal.id !== id));
  }

  return (
    <View style={styles.container}>
      <Button title="Add New Goal" color="#6a0dad" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              value={enteredGoalText}
              onChangeText={goalInputHandler}
              style={styles.textInput}
              placeholder="Your course goal"
              placeholderTextColor="#999"
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" color="#ff4d4d" onPress={() => setModalVisible(false)} />
              <Button title="Add Goal" color="#6a0dad" onPress={addGoalHandler} />
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={courseGoals}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <Text style={styles.goalsTitle}>Course Goals</Text>}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteGoalHandler(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
textInput: {
 
  borderColor: '#6a0dad', 
  borderWidth: 2,
  padding: 10,  

  borderRadius: 8,         
 
  fontSize: 20,
  backgroundColor: '#fff', 
  color: '#000',           
},
  goalsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6a0dad',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  goalText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});