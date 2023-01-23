import {StyleSheet, View, Text} from "react-native";
import Colors from "../../constants/colors";

function Card({title, style, children}) {
    return (
        <View style={[styles.card, style]}>
            <Text style={styles.titleText}>{title}</Text>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
    titleText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        color: Colors.accent500,
    },
});
