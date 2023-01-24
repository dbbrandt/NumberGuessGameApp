import {
    View, StyleSheet, Alert, TextInput, useWindowDimensions, KeyboardAvoidingView, ScrollView
} from 'react-native';
import {useState} from 'react';
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

function StartGameScren({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    };

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (chosenNumber < 1 || chosenNumber > 99 || isNaN(enteredNumber)) {
            Alert.alert('Invalid Number', 'Must be a number between 1 and 99',
                [{text: 'Okay', style: 'destrructive', onPress: resetInputHandler}])
            return;
        }
        onPickNumber(chosenNumber);
    };

    const margineTopDistance = height < 500 ? 30 : 100;
    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior={'position'}>
                <View style={[styles.rootContainer, {marginTop: margineTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card title='Enter a Number' style={styles.card}>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                        />
                        <View style={styles.buttonsContainer}>
                            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    );
}

export default StartGameScren;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        // marginTop: 50,
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    card: {
        marginTop: 60,
        marginHorizontal: 40,
    },
});