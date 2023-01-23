import {useState, useEffect} from "react";
import {View, StyleSheet, Alert, FlatList, Text, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Title from '../components/ui/Title'
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Colors from "../constants/colors"

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

let initialGuess = 0;

function GameScreen({userNumber, onGameOver}) {
    const [minBoundry, setMinBoundry] = useState(1);
    const [maxBoundry, setMaxBoundry] = useState(100);
    const [currentGuess, setCurrentGuess] = useState(0);
    const [guessLog, setGuessLog] = useState([]);

    useEffect(() => {
        console.log(`useEffect: CurrentGuess: ${currentGuess} - userNumber: ${userNumber} - GuessCount = ${guessLog.length}`);
        if (currentGuess === userNumber) {
            console.log("UseEffect: Number match!")
            onGameOver(guessLog);
        }
    }, [userNumber, currentGuess]);


    useEffect(() => {
        initialGuess = generateRandomBetween(1, 100, userNumber);
        setCurrentGuess(initialGuess);
        console.log(`Initial guess: ${initialGuess}`);
    }, []);

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
            console.log(`v Set Min Boundry to ${currentGuess + 1}`)
            min = currentGuess + 1;
            setMinBoundry(min);
        }
        console.log(`Generate: min:${min} max: ${max} exclude: ${currentGuess}`);
        const newRndNumber = generateRandomBetween(min, max, currentGuess);
        setCurrentGuess(newRndNumber);
        const newGuessLog = [...guessLog, newRndNumber];
        console.log(`New log: ${newGuessLog}`);
        setGuessLog(prevGuessLog => [...prevGuessLog, newRndNumber]);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.guessContainer}>
                <Title style={styles.title}>Opponent's Guess</Title>
                <NumberContainer style={styles.numberContainer}>{currentGuess}</NumberContainer>
            </View>

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
            {guessLog.length > 0 &&

            <View style={styles.cardGuess}>
                <FlatList
                    data={guessLog}
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.guessList}>
                                <Text style={styles.guessText}>{index +1} - {item}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            }
        </View>
    )
}

export default GameScreen;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 20,
        padding: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    guessContainer: {
        alignItems: 'center',
        marginVertical: 50,
    },
    numberContainer: {
        marginTop: 50,
    },
    card: {
        marginHorizontal: 40,
        marginBottom: 20,
    },
    cardGuess: {
        marginHorizontal: 40,
        marginBottom: 20,
        maxHeight: deviceWidth < 400 ? 120 : 300,
    },
    title: {
        marginHorizontal: 30,
    },
    guessText: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary800,
        paddingHorizontal: 5,
        marginTop: 5,
        textAlign: 'center',
    },
    guessList: {
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: deviceWidth < 400 ? 2 : 6,
        marginVertical: 2,
        backgroundColor: Colors.accent500,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.25,
        shadowRadius: 3,
        width: '100%',
    },
});