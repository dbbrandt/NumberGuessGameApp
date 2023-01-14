import {useState, useEffect} from "react";
import {View, StyleSheet, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Title from '../components/ui/Title'
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    console.log(`Generate: min: ${min} max: ${max} exclude: ${exclude} rndNum: ${rndNum}`);

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

// const minValue = 1;
// const maxValue = 100;
//
// let minBoundry = minValue;
// let maxBoundry = maxValue;



function GameScreen({userNumber, onGameOver}) {
    const [minBoundry, setMinBoundry] = useState(1);
    const [maxBoundry, setMaxBoundry] = useState(100);
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessLog, setGuessLog] = useState([]);

    useEffect(() => {
        console.log(`useEffect: CurrentGuess: ${currentGuess} - userNumber: ${userNumber} - GuessCount = ${guessLog.length}`);
        if (currentGuess === userNumber) {
            console.log("UseEffect: Number match!")
            onGameOver(guessLog);
        }
    }, [userNumber, currentGuess]);

    function nextGuessHandler(direction) {
        let min = minBoundry;
        let max = maxBoundry;
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't liew!", 'You know that this is wrong...', [
                {text: 'Sorry!', style: 'cancel'}
            ]);
            return;
        }
        if (direction === 'lower') {
            console.log(`^ Set Max Boundry to ${currentGuess}`)
            max = currentGuess
            setMaxBoundry(max);
        } else {
            console.log(`v Set Min Boundry to ${currentGuess}`)
            min = currentGuess;
            setMinBoundry(min);
        }
        console.log(`Generate: min:${min} max: ${max} exclude: ${currentGuess}`);
        const newRndNumber = generateRandomBetween(min, max, currentGuess);
        setCurrentGuess(newRndNumber);
        const newGuessLog = [...guessLog, newRndNumber];
        console.log(`New log: ${newGuessLog}`);
        setGuessLog([...guessLog, newRndNumber]);
    }

    return (
        <View style={styles.screen}>
            <Title style={styles.title}>Opponent's Guess</Title>
            <NumberContainer style={styles.numberContainer}>{currentGuess}</NumberContainer>
            <Card title='Higher or Lower' style={styles.card}>
                <View style={styles.buttonsContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white'/>
                    </PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                    </PrimaryButton>
                </View>
            </Card>
            {/*<View>LOG ROUNDS</View>*/}
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 20,
        padding: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    numberContainer: {
        margin: 50,
        marginHorizontal: 80,
    },
    card: {
        marginHorizontal: 40,
    },
    title: {
        marginHorizontal: 30,
    },
});