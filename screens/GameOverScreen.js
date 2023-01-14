import {View, Text, Image, StyleSheet} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({userNumber, guessLog, handleNewGame}) {
    console.log(`GameOver GuessLog: ${guessLog}`);
    return (
        <View style={styles.rootContainer}>
            <Title style={styles.title}>Game Over!</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/success.png')}/>
            </View>
            <Card title='Game Results' style={styles.card}>
                <View style={styles.resultsContainer}>
                    <Text style={styles.results}>You phone needed
                        <Text style={styles.resultsBold}> {guessLog.length} </Text>
                        rounds to guess the number
                        <Text style={styles.resultsBold}> {userNumber} </Text>.
                    </Text>
                    <Text style={styles.results}>Guesses:</Text>
                    <View style={styles.guessList}>
                        {guessLog.map((log, index) => {
                            return <Text key={index} style={styles.guessText}>{index + 1}) {log}</Text>
                        })}
                    </View>
                </View>
                <PrimaryButton style={styles.button} onPress={handleNewGame}>
                    Start new game
                </PrimaryButton>
            </Card>
        </View>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        paddingHorizontal: 20,
    },
    card: {
        marginTop: 0,
    },
    resultsContainer: {
        margin: 10,
    },
    results: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.accent500,
        padding: 4,
    },
    resultsBold: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent500,
    },
    guessList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
    },
    guessText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        padding: 5,
    },
    button: {
        flex: 0,
    }
});