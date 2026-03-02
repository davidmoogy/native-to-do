
import { Text,View ,StyleSheet } from "react-native";

 function Numbercontainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
 }

export default Numbercontainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#ddb320',
        padding: 12,
        borderRadius: 8,
        marginVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ddb320',
    },
});