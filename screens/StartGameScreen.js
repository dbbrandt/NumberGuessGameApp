import {TextInput, View, StyleSheet} from 'react-native';
import PrimaryButton from "../components/PrimaryButton";

function StartGameScren() {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
                <TextInput style={styles.numberInput}
                           maxLength={2}
                           keyboardType="number-pad"
                           autoCapitalize="none"
                           autoCorrect={false}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <PrimaryButton>Reset</PrimaryButton>
                <PrimaryButton>Confirm</PrimaryButton>
            </View>
        </View>

    );
}

export default StartGameScren;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: '#3B021F',
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
    textContainer: {
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
});