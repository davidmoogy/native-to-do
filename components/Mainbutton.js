import { Pressable, Text, View, StyleSheet } from "react-native";

function Mainbutton({ children, onPress }) {
 

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ff8a8a" }}
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Mainbutton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
  
    borderRadius: 16,
    margin: 10,
    overflow: "hidden",
    elevation: 6, 
    backgroundColor: "#ff4d4d",
  },

  buttonInnerContainer: {
    
    paddingVertical: 14,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  pressed: {
    opacity: 0.6,
  },
});