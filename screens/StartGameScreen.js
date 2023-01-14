import {View, StyleSheet, Alert} from 'react-native';
import {useState} from 'react';
import PrimaryButton from "../components/ui/PrimaryButton";
import GameInput from "../components/game/GameInput";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

function StartGameScren({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    function handleNumberInput(enteredNumber) {
        setEnteredNumber(enteredNumber);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    };

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (chosenNumber < 1 || chosenNumber > 99 || isNaN(enteredNumber)) {
            Alert.alert('Invalid Number', 'Must be a number between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        onPickNumber(chosenNumber);
    };

    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card title='Enter a Number' style={styles.card}>
                <View style={styles.textContainer}>
                    <GameInput
                        numberInputHandler={handleNumberInput}
                        text={enteredNumber}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </Card>
        </View>

    );
}

export default StartGameScren;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    textContainer: {
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    card: {
        marginTop: 60,
        marginHorizontal: 40,
    },
});