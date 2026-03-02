import { Text, View, StyleSheet, FlatList } from "react-native";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import Numbercontainer from "../components/Numbercont";
import Mainbutton from "../components/Mainbutton";

function radomnumbergenerator(min, max, exclude) {
  if (min >= max) {
    return min;
  }

  const randomnumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomnumber === exclude) {
    return radomnumbergenerator(min, max, exclude);
  } else {
    return randomnumber;
  }
}

let minboundary = 1;
let maxboundary = 100;

function Gamescreen({ usernumber, onGameOver }) {

  const initialguess = radomnumbergenerator(minboundary, maxboundary, usernumber);

  const [currentguess, setcurrentguess] = useState(initialguess);
  const [error, seterror] = useState("");
  const [guessrounds, setguessrounds] = useState([initialguess]);

  // 🎯 GAME OVER CHECK
  useEffect(() => {
    if (currentguess === usernumber) {
      onGameOver(guessrounds.length);
    }
  }, [currentguess, usernumber]);

  function nextguesshandler(direction) {

    if (
      (direction === "lower" && currentguess < usernumber) ||
      (direction === "higher" && currentguess > usernumber)
    ) {
      seterror("Don't lie 😅 This is wrong!");
      return;
    }

    seterror("");

    if (direction === "lower") {
      maxboundary = currentguess;
    } else {
      minboundary = currentguess + 1;
    }

    const newrandomnumber = radomnumbergenerator(
      minboundary,
      maxboundary,
      currentguess
    );

    setcurrentguess(newrandomnumber);

    // 📊 add to list
    setguessrounds((prev) => [newrandomnumber, ...prev]);
  }

  function renderItem(itemData) {
    return (
      <View style={styles.listItem}>
        <Text>#{guessrounds.length - itemData.index}</Text>
        <Text>{itemData.item}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>

      <Numbercontainer>{currentguess}</Numbercontainer>

      <View style={styles.controls}>
        <Text style={styles.text}>Higher or lower?</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.buttons}>
          <Mainbutton onPress={nextguesshandler.bind(this, "higher")}>
            +
          </Mainbutton>

          <Mainbutton onPress={nextguesshandler.bind(this, "lower")}>
            -
          </Mainbutton>
        </View>
      </View>

      {/* 📊 LIST */}
      <View style={styles.listContainer}>
        <FlatList
          data={guessrounds}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.toString() + index}
        />
      </View>

    </View>
  );
}

export default Gamescreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
    alignItems: "center",
  },
  controls: {
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});